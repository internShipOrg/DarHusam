// serverSide/routes/volunteerRoutes.js
const express = require("express");
const { createVolunteer, getVolunteers } = require("../controllers/volunteerController");
const router = express.Router();

// إضافة متطوع جديد
router.post("/volunteers", createVolunteer);

// جلب جميع المتطوعين
router.get("/volunteers", getVolunteers);

module.exports = router;
