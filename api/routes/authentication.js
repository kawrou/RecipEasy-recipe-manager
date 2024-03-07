const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/authentication");
const tokenChecker = require("../middleware/tokenChecker");

router.post("/", AuthenticationController.createToken);
router.get("/", tokenChecker, AuthenticationController.checkToken);

module.exports = router;
