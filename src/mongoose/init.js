const { default: mongoose } = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/hotel-booking-apps")
  .then(() => {
    console.log("Database is connected");
  })
  .catch((e) => console.log(e));
