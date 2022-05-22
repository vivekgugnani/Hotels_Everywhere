const { Router } = require("express");
const User = require("../models/users");
const auth = require("../middlewares/auth");

const userRoutes = Router();

userRoutes.post("/api/v1/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

userRoutes.post("/api/v1/user/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const token = await user.generateAuthToken();
    console.log({
      message: "User Created",
    });
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

userRoutes.post("/api/v1/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({
      message: "Successfully logged out",
    });
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = userRoutes;
