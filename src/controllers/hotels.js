import client from "../db/redis.js";
import Booking from "../models/bookings.js";
import Hotel from "../models/hotels.js";
import Room from "../models/rooms.js";

const getHotels = async (req, res) => {
  const city = req.body.city;

  const checkIn = new Date(req.body.checkIn);
  const checkOut = new Date(req.body.checkOut);

  if (!(city && checkIn && checkOut)) {
    res.status(400).send({
      e: "Invalid Arguments",
    });
    return;
  }
  try {
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
    const data = await Hotel.find({
      city: city,
    }).populate("rooms");

    const remainingRooms = data.filter((remaining) => {
      if (remaining.rooms[0]._id === undefined) {
        console.log(remaining);
      }
      const id1 = remaining.rooms[0]._id.toString();
      const id2 = remaining.rooms[1]._id.toString();
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

    const key = city + " " + req.body.checkIn + " " + req.body.checkOut;
    client.setEx(key, 3600, JSON.stringify(remainingRooms));
    res.status(200).send(remainingRooms);
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

const getHotelById = async (req, res) => {
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
};

export { getHotelById, getHotels };
