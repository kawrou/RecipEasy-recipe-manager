const { generateToken } = require("../lib/token");
const User = require("../models/user");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ email, password });
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

const getUserById = async (req, res) => {
  const userId = req.params.user_id;
  const user = await User.findById(userId).select("-password -email");
  const newToken = generateToken(req.user_id); // Use the generateToken function
  res.status(200).json({ user: user, user_id: req.user_id, token: newToken });
};

const UsersController = {
  create: create,
  getUserById: getUserById,
};

module.exports = UsersController;