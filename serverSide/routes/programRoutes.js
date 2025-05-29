const express = require("express");
const router = express.Router();
const { getPrograms, getCategories } = require("../controllers/programController");
const Program = require("../models/programModel");

// ✅ GET البرامج
router.get("/", getPrograms);

// ✅ GET الفئات فقط
router.get("/categories", getCategories);

// ✅ POST برنامج جديد
router.post("/", async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.status(201).json({ message: "تم إضافة البرنامج بنجاح", program });
  } catch (err) {
    res.status(500).json({ message: "حدث خطأ", error: err.message });
  }
});

module.exports = router;
