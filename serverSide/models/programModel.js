const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  startDate: String,
  endDate: String,
});

module.exports = mongoose.model("Program", programSchema);


