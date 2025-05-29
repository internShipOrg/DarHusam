const Program = require("../models/programModel");


exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();      
    res.status(200).json(programs);            
  } catch (err) {
    console.error("Error fetching programs:", err);
    res.status(500).json({ error: "Server error" });
  }
};
