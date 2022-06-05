import Booking from "../models/bookings.js";
import User from "../models/users.js";

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    await user.generateAuthToken();

    res.send(user);
  } catch (e) {
    res.status(500).send({
      error: e,
    });
  }
};

const signUpUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    await user.generateAuthToken();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send({
      error: e,
    });
  }
};

const logOutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send({
      message: "Successfully logged out",
    });
  } catch (error) {
    res.status(500).send({
      error: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await Booking.deleteMany({
      user: req.user._id,
    });
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send({
      error: e,
    });
  }
};

export { loginUser, signUpUser, logOutUser, deleteUser };
