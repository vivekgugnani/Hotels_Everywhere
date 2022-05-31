import express from "express";
import hotelRoutes from "./routes/hotels.js";
import userRoutes from "./routes/user.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import bookingRoutes from "./routes/bookings.js";
import "./db/init.js";

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.use(hotelRoutes);
app.use(userRoutes);
app.use(bookingRoutes);

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

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
