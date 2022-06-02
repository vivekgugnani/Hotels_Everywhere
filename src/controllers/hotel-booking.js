import asyncHandler from "express-async-handler";

import Booking from "../models/bookings.js";
import User from "../models/users.js";

const newBooking = async (req, res) => {
  const { amountPaid, daysOfStay } = req.body;
  const user = req.user.id;
  const room = req.body.roomid;
  const checkInDate = new Date(parseInt(req.body.checkInDate));
  const checkOutDate = new Date(parseInt(req.body.checkOutDate));
  const paidAt = new Date(parseInt(req.body.paidAt));
  if (
    !(
      user ||
      room ||
      checkInDate ||
      checkOutDate ||
      amountPaid ||
      daysOfStay ||
      paidAt
    )
  ) {
    res.status(400).send({
      message: "Invalid Parameters",
    });
    return;
  }
  const bookRoomObj = {
    user,
    room,
    checkInDate,
    checkOutDate,
    amountPaid,
    daysOfStay,
    paidAt,
  };
  try {
    const bookedRooms = await Booking.find({});

    const sameDates = bookedRooms.filter((room) => {
      return (
        checkInDate >= room.checkInDate &&
        checkInDate <= room.checkOutDate &&
        room.status !== "Cancelled"
      );
    });
    let isAlreadyBooked = false;
    sameDates.map((rooms) => {
      if (rooms.room.toString() === room) {
        isAlreadyBooked = true;
      }
    });
    if (isAlreadyBooked) {
      res.status(400).send({
        message: "Room is Already Booked",
      });
      return;
    }
    bookRoomObj.status = "Confirmed";
    const book = new Booking(bookRoomObj);
    req.user.bookings = req.user.bookings ? req.user.bookings : [];
    req.user.bookings.push(book._id);
    await User.updateOne(
      {
        _id: req.user._id,
      },
      req.user
    );
    await book.save();

    res.status(200).send({
      book,
    });
  } catch (e) {
    res.status(400).send({
      message: "The Error is " + e,
    });
  }
};

const showBooking = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("bookings");
    res.status(200).send(user.bookings);
  } catch (e) {
    res.status(400).send({
      message: e,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const book = await Booking.findById(req.params.id);
    if (book === undefined) {
      res.status(400).send({
        message: "No such booking Exist",
      });
    }
    if (book.status === "Cancelled") {
      res.status(400).send({
        message: "Already Cancelled",
      });
    }
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
      message: "There is some Error: " + e,
    });
  }
};

const changeBookingStatus = async (req, res) => {
  const bookingid = req.params.id;
  const bookingStatus = req.body.status;
  try {
    const book = await Booking.findByIdAndUpdate(bookingid, {
      status: bookingStatus,
    });

    res.status(200).send(book);
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

export { newBooking, showBooking, cancelBooking, changeBookingStatus };
