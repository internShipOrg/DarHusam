// serverSide/routes/traineeRoutes.js
const express = require("express");
const { createTrainee, getTrainees } = require("../controllers/traineeController");
const router = express.Router();

// إضافة متدرب جديد
router.post("/trainees", createTrainee);

// جلب جميع المتدربين
router.get("/trainees", getTrainees);

module.exports = router;
