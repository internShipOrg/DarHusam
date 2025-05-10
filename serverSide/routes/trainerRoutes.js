// serverSide/routes/trainerRoutes.js
const express = require("express");
const { createTrainer, getTrainers } = require("../controllers/trainerController");
const router = express.Router();

// إضافة مدرب جديد
router.post("/trainers", createTrainer);

// جلب جميع المدربين
router.get("/trainers", getTrainers);

module.exports = router;
