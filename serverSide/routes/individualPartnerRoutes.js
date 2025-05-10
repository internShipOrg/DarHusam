const express = require("express");
const { createIndividualPartner, getIndividualPartners } = require("../controllers/individualPartnerController");
const router = express.Router();

// إضافة شريك فردي جديد
router.post("/individual-partners", createIndividualPartner);

// جلب جميع الشركاء الأفراد
router.get("/individual-partners", getIndividualPartners);

module.exports = router; 