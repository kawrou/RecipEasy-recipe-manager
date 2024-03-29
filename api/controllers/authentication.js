const User = require("../models/user");
const { generateToken } = require("../lib/token");

const createToken = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("Auth Error: User not found");
    res.status(401).json({ message: "User not found" });
  } else if (user.password !== password) {
    console.log("Auth Error: Passwords do not match");
    res.status(401).json({ message: "Password incorrect" });
  } else {
    const token = generateToken(user.id);
    res.status(201).json({ token: token, message: "OK" });
  }
};
//TODO: Needs a simple test for this
// uses token checker to test if a token is valid
const checkToken = async (req, res) => {
  // res.json({ message: 'Token is valid' });
  try {
    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const AuthenticationController = {
  createToken: createToken,
  checkToken: checkToken,
};

module.exports = AuthenticationController;
