const express = require("express");
const RecipesController = require("../controllers/recipes.js");
const getRecipesController = require("../controllers/getRecipes")

const router = express.Router();

router.get("/scrape-recipe", RecipesController.fetchRecipeData);

router.get('/:user_id', getRecipesController.getAllRecipesByUserId); 
module.exports = router;