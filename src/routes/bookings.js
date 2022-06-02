import { Router } from "express";
import {
  newBooking,
  showBooking,
  cancelBooking,
  changeBookingStatus,
} from "../controllers/hotel-booking.js";
import { auth, isAdmin } from "../middlewares/auth.js";
import Booking from "../models/bookings.js";
import User from "../models/users.js";

const bookingRoutes = new Router();
//Create Bookings

/**
 *
 * @swagger
 *
 * securityDefinitions:
 *  Bearer:
 *    type: apiKey
 *    name: Authorization
 *    in: header
 *
 * paths:
 *  /api/v1/booking:
 *    post:
 *      description: Book a Hotel
 *      security:
 *        - Bearer: []
 *      parameters:
 *      - in: body
 *        name: bookings
 *        schema:
 *          type: object
 *          properties:
 *            roomid:
 *              type: string
 *              example: 628a138b2deac25a60b4f9ca
 *            checkInDate:
 *              type: string
 *              example: 1656390177000
 *            checkOutDate:
 *              type: string
 *              example: 1656735777000
 *            amountPaid:
 *              type: number
 *              example: 1800
 *            daysOfStay:
 *              type: number
 *              example: 2
 *            paidAt:
 *              type: string
 *              example: 1653304560596
 *      responses:
 *        '200':
 *          description: Successfully booked hotel
 *        '401':
 *          description: Authentication Failed
 *        '400':
 *          description: Invalid Parameters / Room is Already booked
 *
 */

bookingRoutes.post("/api/v1/booking", auth, newBooking);

// Show Bookings

/**
 *
 * @swagger
 *
 * securityDefinitions:
 *  Bearer:
 *    type: apiKey
 *    name: Authorization
 *    in: header
 *
 * paths:
 *  /api/v1/booking:
 *    get:
 *      description: Route to view bookings
 *      security:
 *        - Bearer: []
 *
 *      responses:
 *        '200':
 *          description: Show all bookings
 *        '401':
 *          description: Authentication Failed
 *        '400':
 *          description: some Error
 */

bookingRoutes.get("/api/v1/booking", auth, showBooking);

// Cancellation Booking

/**
 *
 * @swagger
 *
 * securityDefinitions:
 *  Bearer:
 *    type: apiKey
 *    name: Authorization
 *    in: header
 *
 * paths:
 *  /api/v1/booking/{id}:
 *    patch:
 *      description: Route to Cancel Booking
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          example: 628b7181128b35ba7c97db19
 *
 *        required: true
 *        description: Numeric ID of booking to cancel booking
 *      security:
 *        - Bearer: []
 *
 *      responses:
 *        '200':
 *          description: Successfully Cancelled
 *        '401':
 *          description: Authentication Failed
 *        '400':
 *          description: some Error
 *        '301':
 *          description: Already Cancelled / No such booking exist
 */
bookingRoutes.patch("/api/v1/booking/:id", auth, cancelBooking);

/**
 *
 * @swagger
 *
 * securityDefinitions:
 *  Bearer:
 *    type: apiKey
 *    name: Authorization
 *    in: header
 *
 * paths:
 *  /api/v1/admin/booking/{id}:
 *    patch:
 *      description: Route to Change Booking status by hotel manager/admin
 *      parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          example: 6294d7f91027589006a77ac3
 *        required: true
 *      - in: body
 *        name: bookings
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: string
 *              example: Fulfilled
 *        description: Numeric ID of booking to change booking status
 *      security:
 *        - Bearer: []
 *
 *      responses:
 *        '200':
 *          description: Successfully changed status
 *        '401':
 *          description: Authentication Failed
 *        '400':
 *          description: user is not an admin
 *        '500':
 *          description: No such booking exist
 */

bookingRoutes.patch(
  "/api/v1/admin/booking/:id",
  auth,
  isAdmin,
  changeBookingStatus
);

export default bookingRoutes;
