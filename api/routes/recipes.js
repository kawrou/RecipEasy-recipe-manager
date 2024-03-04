const express = require("express");
const RecipesController = require("../controllers/recipes.js")
// TODO:
// Incase there are conflicts that arise from testing or implementation between scraping recipes
// and retrieving recipes from the database, can use the following controller. 
// Otherwise delete once tests pass. 
// const getRecipesController = require("../controllers/getRecipes")

const router = express.Router();

router.get("/scrape-recipe", RecipesController.fetchRecipeData);
router.get('/:user_id', RecipesController.getAllRecipesByUserId); 
// Can delete once all tests resolve. 
// router.get('/:user_id', getRecipesController.getAllRecipesByUserId); 
module.exports = router;