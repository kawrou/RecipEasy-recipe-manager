const { generateToken } = require("../lib/token");
const User = require("../models/user");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const user = new User({ email, password, username });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ token, user_id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

const UsersController = {
  create: create,
  login:login,
  logout, logout
};

module.exports = UsersController;