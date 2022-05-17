const express = require("express");
const hotelRoutes = require("./routes/hotels");

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(hotelRoutes);

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
