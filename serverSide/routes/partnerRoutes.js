// serverSide/routes/partnerRoutes.js
const express = require("express");
const { createPartner, getPartners } = require("../controllers/partnerController");
const router = express.Router();

// إضافة شريك جديد
router.post("/partners", createPartner);

// جلب جميع الشركاء
router.get("/partners", getPartners);

module.exports = router;
