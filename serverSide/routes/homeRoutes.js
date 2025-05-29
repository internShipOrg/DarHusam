const express = require("express");
const router = express.Router();
const { getAllPrograms } = require("../controllers/homeController");

router.get("/programs", getAllPrograms);

module.exports = router;