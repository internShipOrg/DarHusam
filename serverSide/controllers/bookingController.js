
const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { hallId, hallName, fullName, phone, email, date, time, notes } =
      req.body;

    // Check for existing booking
    const existingBooking = await Booking.findOne({ hallId, date, time });
    if (existingBooking) {
      return res.status(400).json({ message: "الوقت المحدد محجوز مسبقًا." });
    }

    const booking = new Booking({
      hallId,
      hallName,
      fullName,
      phone,
      email,
      date,
      time,
      notes,
    });

    await booking.save();
    res.status(201).json({ message: "تم إنشاء الحجز بنجاح." });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم.", error });
  }
};

exports.getBookedTimes = async (req, res) => {
  try {
    const bookings = await Booking.find();
    const bookedTimes = {};

    bookings.forEach((booking) => {
      if (!bookedTimes[booking.hallId]) {
        bookedTimes[booking.hallId] = {};
      }
      if (!bookedTimes[booking.hallId][booking.date]) {
        bookedTimes[booking.hallId][booking.date] = [];
      }
      bookedTimes[booking.hallId][booking.date].push(booking.time);
    });

    res.status(200).json(bookedTimes);
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم.", error });
  }
};