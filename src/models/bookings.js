const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Room",
    },

    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },

    checkInDate: {
      type: Date,
      required: true,
    },

    checkOutDate: {
      type: Date,
      required: true,
    },

    amountPaid: {
      type: Number,
      required: true,
    },

    daysOfStay: {
      type: Number,
      required: true,
    },

    paidAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.mode;
"Booking", BookingSchema;

module.exports = Booking;
