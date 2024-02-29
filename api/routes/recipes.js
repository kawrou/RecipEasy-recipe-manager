const express = require("express");
const RecipesController = require("../controllers/recipes");

const router = express.Router();
const tokenChecker = require("../middleware/tokenChecker");

router.get("/scrape-recipe",tokenChecker, RecipesController.fetchRecipeData);

module.exports = router;

