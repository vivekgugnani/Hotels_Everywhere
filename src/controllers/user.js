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
    res.status(400).send({
      message: "Authentication Failed!",
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
    res.status(400).send({
      message: "User Already created",
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
    res.status(401).send({
      message: "Authentication Failed",
    });
  }
};

export { loginUser, signUpUser, logOutUser };
