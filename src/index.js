const express = require("express");
const hotelRoutes = require("./routes/hotels");
const userRoutes = require("./routes/user");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const bookingRoutes = require("./routes/bookings");
require("./db/init");

const port = process.env.PORT || 4000;
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Hotel Booking API",
      description: "Hotel Customer Endpoints",
      contact: {
        name: "Vivek",
      },
      servers: ["http://localhost:4000"],
    },
  },
  apis: ["./src/routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(hotelRoutes);
app.use(userRoutes);
app.use(bookingRoutes);

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
