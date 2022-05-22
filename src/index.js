const express = require("express");
const hotelRoutes = require("./routes/hotels");
const userRoutes = require("./routes/user");
const bookingRoutes = require("./routes/bookings");
require("./db/init");

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(hotelRoutes);
app.use(userRoutes);
app.use(bookingRoutes);

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
