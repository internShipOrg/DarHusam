require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const newsRoutes = require("./routes/newsRoutes");
const connectDB = require("./config/db");
// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

const cron = require("node-cron");
const Subscriber = require("./models/subscriberModel");
const sgMail = require("@sendgrid/mail");
const subscriberRoutes = require("./routes/subscriberRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

cron.schedule(
  "0 9 * * 1",
  async () => {
    console.log("⏰ إرسال النشرة الأسبوعية");
    const subs = await Subscriber.find().lean();
    const html = "<h1>آخر الأخبار</h1><p>هنا تفاصيل التحديثات …</p>";

    subs.forEach(({ email }) => {
      sgMail
        .send({
          to: email,
          from: process.env.EMAIL_FROM,
          subject: "النشرة الأسبوعية",
          html,
        })
        .catch((e) => console.error(`Failed ${email}:`, e.message));
    });
  },
  { timezone: "Asia/Amman" }
);

const volunteerRoutes = require("./routes/volunteerRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const traineeRoutes = require("./routes/traineeRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const individualPartnerRoutes = require("./routes/individualPartnerRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Increase payload limit to 10MB
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Enable CORS
app.use(cors());

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/news", newsRoutes);
app.use("/api", volunteerRoutes);
app.use("/api", trainerRoutes);
app.use("/api", traineeRoutes);
app.use("/api", partnerRoutes);
app.use("/api", individualPartnerRoutes);
app.use("/api/add", subscriberRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "حدث خطأ في الخادم",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
