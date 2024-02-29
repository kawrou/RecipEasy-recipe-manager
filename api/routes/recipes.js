const express = require("express");
const RecipesController = require("../controllers/recipes");

const router = express.Router();

router.get("/scrape-recipe", RecipesController.fetchRecipeData);

module.exports = router;