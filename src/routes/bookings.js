const { Router } = require("express");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const Booking = require("../models/bookings");
const User = require("../models/users");

const bookingRoutes = new Router();

//Create Bookings
bookingRoutes.post("/api/v1/booking", auth, async (req, res) => {
  const user = req.user.id;
  const room = req.body.roomid;
  const checkInDate = new Date(req.body.checkInDate);
  const checkOutDate = new Date(req.body.checkOutDate);

  const amountPaid = req.body.amountPaid;
  const daysOfStay = req.body.daysOfStay;
  const paidAt = new Date(req.body.paidAt);
  const status = req.body.status;
  if (
    !(
      user ||
      room ||
      checkInDate ||
      checkOutDate ||
      amountPaid ||
      daysOfStay ||
      paidAt ||
      status
    )
  ) {
    res.status().send({
      message: "Invalid Arguments",
    });
  }
  const bookRoom = {
    user,
    room,
    checkInDate,
    checkOutDate,
    amountPaid,
    daysOfStay,
    paidAt,
    status,
  };
  try {
    const book = new Booking(bookRoom);
    console.log(book._id);
    req.user.bookings = req.user.bookings ? req.user.bookings : [];
    req.user.bookings.push(book._id);
    await User.updateOne(
      {
        _id: req.user._id,
      },
      req.user
    );
    console.log(book);
    await book.save();
    res.send({
      bookRoom,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Show Bookings

bookingRoutes.get("/api/v1/booking", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("bookings");
    res.status(200).send(user.bookings);
  } catch (e) {
    res.status(400).send({
      message: e,
    });
  }
});

// Cancellation Booking
bookingRoutes.patch("/api/v1/booking/:id", auth, async (req, res) => {
  try {
    await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        status: "Cancelled",
      }
    );

    res.status(200).send({
      message: "Successfully Cancelled",
    });
  } catch (e) {
    res.status(400).send({
      message: e,
    });
  }
});

module.exports = bookingRoutes;
