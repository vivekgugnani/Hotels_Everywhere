const mongoose = require("mongoose");

const mongoDBconnectionString = "mongodb://127.0.0.1/hotel-booking-api";

mongoose
  .connect(mongoDBconnectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log(e);
  });
