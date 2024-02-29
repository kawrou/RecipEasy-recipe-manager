const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.get("/:user_id", UsersController.getUserById);

module.exports = router;
