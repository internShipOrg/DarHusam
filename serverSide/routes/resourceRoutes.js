const  express = require('express');
const resourceController = require("../controllers/resourceController.js");

const router = express.Router();

router.post("/", resourceController.createResource); // للإدارة أو لوحة التحكم
router.get("/", resourceController.getResources); // للواجهة العامة

module.exports = router;