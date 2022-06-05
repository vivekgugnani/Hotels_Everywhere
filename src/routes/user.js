import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  loginUser,
  signUpUser,
  logOutUser,
  deleteUser,
} from "../controllers/user.js";

const userRoutes = Router();

/**
 * @swagger
 * /api/v1/user/login:
 *  post:
 *    tags:
 *      - User Api
 *    description: Route to authenticate user with email and password
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              example: vivek@gmail.com
 *            password:
 *              type: string
 *              example: qwertuiop
 *
 *    responses:
 *      '200':
 *        description: User got authenticated Successfully and user token is generated
 *      '500':
 *        description: User authentication got failed. or maybe some server error
 *
 *
 *
 */

userRoutes.post("/api/v1/user/login", loginUser);

/**
 * @swagger
 * /api/v1/user/signup:
 *  post:
 *    tags:
 *      - User Api
 *    description: Route to signup user
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              example: vivek@gmail.com
 *            password:
 *              type: string
 *              example: qwertuiop
 *            name:
 *              type: string
 *              example: Vivek
 *
 *    responses:
 *      '201':
 *        description: User account generated successfully
 *      '500':
 *        description: user already created. or some server error
 */

userRoutes.post("/api/v1/user/signup", signUpUser);

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
 *  /api/v1/user/logout:
 *    post:
 *      tags:
 *        - User Api
 *      description: Route to signup user
 *      security:
 *        - Bearer: []
 *
 *      responses:
 *        '200':
 *          description: Successfully Logged out
 *        '401':
 *          description: Authentication Failed
 *        '500':
 *          description: Some server error
 */

userRoutes.post("/api/v1/user/logout", auth, logOutUser);

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
 *  /api/v1/user/delete:
 *    delete:
 *      tags:
 *        - User Api
 *      description: Route to delete user and it's bookings.
 *      security:
 *        - Bearer: []
 *
 *      responses:
 *        '200':
 *          description: User successfully deleted
 *        '401':
 *          description: Authentication Failed
 *        '500':
 *          description: Some Server Error
 */

userRoutes.delete("/api/v1/user/delete", auth, deleteUser);

export default userRoutes;
