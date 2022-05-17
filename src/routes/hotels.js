const { Router } = require("express");
const auth = require("../middlewares/auth");
const Hotel = require("../models/hotels");
const Room = require("../Models/rooms");
const uploadHotels = require("../seedDB");
// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

//uploadHotels();

routes.get("/api/v1/hotels", async (req, res) => {
  const city = req.body.city;
  const checkIn = req.body.checkIn;
  const checkOut = req.body.checkOut;

  if (!(city && checkIn && checkOut)) {
    res.send({
      e: "Invalid Arguments",
    });
    return;
  }

  console.log(city);
  console.log(checkIn);
  console.log(checkOut);
  const data = await Hotel.find({
    city: city,
  }).populate("rooms");
  //console.log(data);
  res.send(data);
});

routes.get("/api/v1/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate("rooms");
    res.status(200).send({
      hotel: hotel,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = hotelroutes = routes;
