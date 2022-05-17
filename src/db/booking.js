const mongoose = require("mongoose");
const Booking = require("../models/bookings");

const bookRoom = async (bookRoom, error) => {
  try {
    const book = new Booking(bookRoom);
    await book.save();
  } catch (e) {
    error(e);
  }
};

module.exports = {
  bookRoom,
};
