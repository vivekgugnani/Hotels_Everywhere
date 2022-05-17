const mongoose = require("mongoose");
const Hotel = require("../models/hotels");

const getData = async () => {
  const data = await Hotel.find({});
  return data;
};

module.exports = {
  getData,
};
