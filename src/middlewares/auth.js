import jwt from "jsonwebtoken";
import User from "../models/users.js";

const secret = "thisismysecret" || process.env.JWT_SECRET;
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    const decoded = jwt.verify(token, secret);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Authentication failed");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({
      message: "Authorization Failed!",
      e: e,
    });
  }
};

export default auth;
