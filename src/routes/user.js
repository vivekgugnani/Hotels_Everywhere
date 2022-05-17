const { Router } = require("express");
const User = require("../models/users");

const userRoutes = Router();

userRoutes.post("/api/v1/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await User.generateAuthToken();

    res.send(user, token);
  } catch (e) {
    res.status(400).send(e);
  }
});

userRoutes.post("/api/v1/user/signup", async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).send(user, token);
    } catch(e) {
        res.send(e)
    }
})

userRoutes.post("/api/v1/user/logout", auth, (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
         res.send()
    } catch (error) {
        res.status(500).send()
    }
})