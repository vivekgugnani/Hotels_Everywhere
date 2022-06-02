import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { loginUser, signUpUser, logOutUser } from "../controllers/user.js";

const userRoutes = Router();

/**
 * @swagger
 * /api/v1/user/login:
 *  post:
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
 *      '400':
 *        description: User authentication got failed
 *
 *
 *
 */

userRoutes.post("/api/v1/user/login", loginUser);

/**
 * @swagger
 * /api/v1/user/signup:
 *  post:
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
 *              example: vivek2@gmail.com
 *            password:
 *              type: string
 *              example: qwertyuiop
 *            name:
 *              type: string
 *              example: Vivek2
 *
 *    responses:
 *      '201':
 *        description: User account generated successfully
 *      '400':
 *        description: user already created
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
 *      description: Route to signup user
 *      security:
 *        - Bearer: []
 *
 *      responses:
 *        '200':
 *          description: Successfully Logged out
 *        '401':
 *          description: Authentication Failed
 */

userRoutes.post("/api/v1/user/logout", auth, logOutUser);

export default userRoutes;
