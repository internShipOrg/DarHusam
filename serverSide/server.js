require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cron = require("node-cron");
const Subscriber = require("./models/subscriberModel");
const sgMail = require("@sendgrid/mail");
const subscriberRoutes = require("./routes/subscriberRoutes");
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

const connectDB = require("./config/db");
const volunteerRoutes = require("./routes/volunteerRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const traineeRoutes = require("./routes/traineeRoutes");
const partnerRoutes = require("./routes/partnerRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", volunteerRoutes);
app.use("/api", trainerRoutes);
app.use("/api", traineeRoutes);
app.use("/api", partnerRoutes);
app.use("/api/add", subscriberRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
