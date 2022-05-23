const { Router } = require("express");
const { all } = require("express/lib/application");
const auth = require("../middlewares/auth");
const Booking = require("../models/bookings");
const Hotel = require("../models/hotels");
const Room = require("../Models/rooms");
// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

/**
 * @swagger
 * /api/v1/hotels:
 *  post:
 *    description: Use to get all Hotels that are not booked within speficied CheckIn and CheckOut
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: hotels
 *        schema:
 *          type: object
 *          properties:
 *            city:
 *              type: string
 *              example: chandigarh
 *            checkIn:
 *              type: string
 *              example: 1656390177000
 *            checkOut:
 *              type: string
 *              example: 1656735777000
 *
 *
 *    responses:
 *      '200':
 *        description: list of all hotels
 *      '400':
 *        description: Invalid Arguments
 *
 *
 */

routes.post("/api/v1/hotels", async (req, res) => {
  console.log(req.body);
  const city = req.body.city;

  const checkIn = new Date(req.body.checkIn);
  const checkOut = new Date(req.body.checkOut);

  if (!(city && checkIn && checkOut)) {
    res.status(400).send({
      e: "Invalid Arguments",
    });
    return;
  }
  const bookedRooms = await Booking.find({});

  const sameDates = bookedRooms.filter((room) => {
    return (
      checkIn > room.checkInDate &&
      checkIn < room.checkOutDate &&
      room.status !== "Cancelled"
    );
  });
  const allBookedRooms = [];
  sameDates.map((room) => {
    allBookedRooms.push(room.room.toString());
  });
  console.log(allBookedRooms);
  const data = await Hotel.find({
    city: city,
  }).populate("rooms");

  const remainingRooms = data.filter((remaining) => {
    if (remaining.rooms[0]._id === undefined) {
      console.log(remaining);
    }
    const id1 = remaining.rooms[0]._id.toString();
    const id2 = remaining.rooms[1]._id.toString();
    //console.log(id1);
    if (allBookedRooms.includes(id1)) {
      console.log("Room1");
      remaining.rooms.splice(0, 1);
    }
    if (allBookedRooms.includes(id2)) {
      console.log("Room2");
      remaining.rooms.pop();
    }
    if (remaining.rooms.length > 0) {
      return true;
    }
  });

  res.send(remainingRooms);
});

/**
 * @swagger
 * /api/v1/hotels/{id}:
 *  get:
 *    description: Use to get details of particular hotel
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        example: 628a13bd2deac25a60b59917
 *      required: true
 *      description: Numeric ID to get hotel Information
 *    responses:
 *      '200':
 *        description: Information about hotel
 *        content:
 *          'application/json':
 *            schema:
 *              type: object
 *      '400':
 *        description: Requested Hotel Information not found
 *        content:
 *          'application/json':
 *            schema:
 *              type: object
 */

routes.get("/api/v1/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate("rooms");
    if (!hotel) {
      res.status(400).send({
        message: "Hotel Not Found",
      });
      return;
    }

    res.status(200).send({
      hotel: hotel,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = hotelroutes = routes;
