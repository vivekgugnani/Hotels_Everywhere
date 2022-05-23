const { Router } = require("express");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const Booking = require("../models/bookings");
const User = require("../models/users");

const bookingRoutes = new Router();

//Create Bookings

/**
 *
 * @swagger
 *
 * securityDefinitions:
 *  Bearer:
 *    type: apiKey
 *    name: Authorization
 *    in: header
 *
 * paths:
 *  /api/v1/booking:
 *    post:
 *      description: Book a Hotel
 *      security:
 *        - Bearer: []
 *      parameters:
 *      - in: body
 *        name: bookings
 *        schema:
 *          type: object
 *          properties:
 *            roomid:
 *              type: string
 *              example: 628a138b2deac25a60b4f9ca
 *            checkInDate:
 *              type: string
 *              example: 1656390177000
 *            checkOutDate:
 *              type: string
 *              example: 1656735777000
 *            amountPaid:
 *              type: number
 *              example: 1800
 *            daysOfStay:
 *              type: number
 *              example: 2
 *            paidAt:
 *              type: string
 *              example: 1653304560596
 *      responses:
 *        '200':
 *          description: Successfully Logged out
 *        '401':
 *          description: Authentication Failed
 *        '400':
 *          description: Invalid Parameters / Room is Already booked
 *
 */

bookingRoutes.post("/api/v1/booking", auth, async (req, res) => {
  const user = req.user.id;
  const room = req.body.roomid;

  const checkInDate = new Date(parseInt(req.body.checkInDate));
  const checkOutDate = new Date(parseInt(req.body.checkOutDate));

  const amountPaid = req.body.amountPaid;
  const daysOfStay = req.body.daysOfStay;
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
  }
  const bookRoom = {
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
    console.log(isAlreadyBooked);
    if (isAlreadyBooked) {
      res.status(400).send({
        message: "Room is Already Booked",
      });
      return;
    }
    bookRoom.status = "Confirmed";
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
    //console.log(book);
    await book.save();

    res.send({
      bookRoom,
    });
  } catch (e) {
    res.status(400).send({
      message: "Error is " + e,
    });
  }
});

// Show Bookings

/**
 *
 * @swagger
 *
 * securityDefinitions:
 *  Bearer:
 *    type: apiKey
 *    name: Authorization
 *    in: header
 *
 * paths:
 *  /api/v1/booking:
 *    get:
 *      description: Route to view bookings
 *      security:
 *        - Bearer: []
 *
 *      responses:
 *        '200':
 *          description: Show all bookings
 *        '401':
 *          description: Authentication Failed
 *        '400':
 *          description: some Error
 */

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

/**
 *
 * @swagger
 *
 * securityDefinitions:
 *  Bearer:
 *    type: apiKey
 *    name: Authorization
 *    in: header
 *
 * paths:
 *  /api/v1/booking/{id}:
 *    patch:
 *      description: Route to Cancel Booking
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          example: 628b7181128b35ba7c97db19
 *        required: true
 *        description: Numeric ID of booking to cancel booking
 *      security:
 *        - Bearer: []
 *
 *      responses:
 *        '200':
 *          description: Successfully Cancelled
 *        '401':
 *          description: Authentication Failed
 *        '400':
 *          description: some Error
 *        '301':
 *          description: Already Cancelled / No such booking exist
 */
bookingRoutes.patch("/api/v1/booking/:id", auth, async (req, res) => {
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
});

module.exports = bookingRoutes;
