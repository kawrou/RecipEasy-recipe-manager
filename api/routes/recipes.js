const express = require("express");
const RecipesController = require("../controllers/recipes.js")
// TODO:
// Incase there are conflicts that arise from testing or implementation between scraping recipes
// and retrieving recipes from the database, can use the following controller. 
// Otherwise delete once tests pass. 
// const getRecipesController = require("../controllers/getRecipes")

const router = express.Router();
// const tokenChecker = require("../middleware/tokenChecker");

router.get("/scrape-recipe", RecipesController.fetchRecipeData);
router.get("/:recipe_id", RecipesController.getRecipeById);
router.post("/", RecipesController.create);

// patch request most suitable - https://www.geeksforgeeks.org/what-is-the-difference-between-put-post-and-patch-in-restful-api/
router.patch("/:recipe_id", RecipesController.updateRecipe);
router.get('/myrecipes/:user_id', RecipesController.getAllRecipesByUserId); 
module.exports = router;
