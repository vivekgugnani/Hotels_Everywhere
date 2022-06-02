import jwt from "jsonwebtoken";
import User from "../models/users.js";

const secret = process.env.JWT_SECRET || "thisismysecret";
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

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(400).send({
      message: "User is not an admin",
    });
    return;
  }

  next();
};
export { auth, isAdmin };
