// serverSide/models/volunteerModel.js
const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  nationalID: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  alternatePhone: { type: String },
  residence: { type: String, required: true },
  educationLevel: { type: String, enum: ["اعدادي", "ثانوي", "توجيهي", "بكالوريوس", "دراسات عليا"], required: true },
  major: { type: String },
  previousExperience: { type: Boolean, required: true },
  previousRole: { type: String },
  preferredField: { type: String, required: true },
  skills: { type: String },
  source: { type: String },
  availability: { type: String, required: true },
  status: { type: String, default: "pending", enum: ["pending", "approved", "rejected"] }
});

module.exports = mongoose.model("Volunteer", volunteerSchema);