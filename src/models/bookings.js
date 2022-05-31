import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    status: {
      type: String,
      required: true,
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

BookingSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "bookings",
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
