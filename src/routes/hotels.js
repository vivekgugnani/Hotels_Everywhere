import { Router } from "express";
import { getHotelById, getHotels } from "../controllers/hotels.js";
import caching from "../middlewares/caching.js";

const hotelRoutes = new Router();

/**
 * @swagger
 * /api/v1/hotels:
 *  post:
 *    description: Use to get all Hotels that are not booked within speficied CheckIn and CheckOut
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: hotels
 *        schema:
 *          type: object
 *          properties:
 *            city:
 *              type: string
 *              example: chandigarh
 *            checkIn:
 *              type: string
 *              example: 1656390177000
 *            checkOut:
 *              type: string
 *              example: 1656735777000
 *
 *
 *    responses:
 *      '200':
 *        description: list of all hotels
 *      '400':
 *        description: Invalid Arguments
 *
 *
 */

hotelRoutes.post("/api/v1/hotels", caching, getHotels);

/**
 * @swagger
 * /api/v1/hotels/{id}:
 *  get:
 *    description: Use to get details of particular hotel
 *    parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *        example: 628a13bd2deac25a60b59917
 *      required: true
 *      description: Numeric ID to get hotel Information
 *    responses:
 *      '200':
 *        description: Information about hotel
 *        content:
 *          'application/json':
 *            schema:
 *              type: object
 *      '400':
 *        description: Requested Hotel Information not found
 *        content:
 *          'application/json':
 *            schema:
 *              type: object
 */

hotelRoutes.get("/api/v1/hotels/:id", getHotelById);

export default hotelRoutes;
