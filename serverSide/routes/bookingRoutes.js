const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);
router.get("/booked-times", bookingController.getBookedTimes);

module.exports = router;
