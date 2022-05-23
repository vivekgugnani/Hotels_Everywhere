const { Router } = require("express");
const User = require("../models/users");
const auth = require("../middlewares/auth");

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

userRoutes.post("/api/v1/user/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send(user);
  } catch (e) {
    res.status(400).send({
      message: "Authentication Failed!",
    });
  }
});

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

userRoutes.post("/api/v1/user/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({
      message: "User Already created",
    });
  }
});

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

userRoutes.post("/api/v1/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send({
      message: "Successfully logged out",
    });
  } catch (error) {
    res.status(401).send({
      message: "Authentication Failed",
    });
  }
});

module.exports = userRoutes;
