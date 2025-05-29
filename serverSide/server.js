require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");


// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in environment variables');
  process.exit(1);
}


const subscriberRoutes = require("./routes/subscriberRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const successStoryRoutes = require("./routes/successStoryRoutes");


// const connectDB = require("./config/db");
const volunteerRoutes = require("./routes/volunteerRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const traineeRoutes = require("./routes/traineeRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const individualPartnerRoutes = require("./routes/individualPartnerRoutes");
const program = require("./routes/programRoutes")
const registerRoutes = require("./routes/register");
const homeRoutes = require("./routes/homeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Increase payload limit to 10MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Enable CORS
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use("/api", volunteerRoutes);
app.use("/api", trainerRoutes);
app.use("/api", traineeRoutes);
app.use("/api", partnerRoutes);
app.use("/api", individualPartnerRoutes);
app.use("/api/add", subscriberRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/programs", program);
app.use("/api/register", registerRoutes);
app.use("/api/success", successStoryRoutes);
app.use("/api/home", homeRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'حدث خطأ في الخادم',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});  