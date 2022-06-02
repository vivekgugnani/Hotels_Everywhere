import mongoose from "mongoose";

const mongoDBconnectionString =
  process.env.MONGO_URL || "mongodb://127.0.0.1/hotel-booking-api";

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
