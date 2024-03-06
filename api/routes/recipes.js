const express = require("express");
const RecipesController = require("../controllers/recipes.js")

const router = express.Router();

router.get("/scrape-recipe", RecipesController.fetchRecipeData);
router.get("/:recipe_id", RecipesController.getRecipeById);
router.post("/", RecipesController.create);

// patch request most suitable - https://www.geeksforgeeks.org/what-is-the-difference-between-put-post-and-patch-in-restful-api/
router.patch("/:recipe_id", RecipesController.updateRecipe);

router.patch("/favouritedByOwner/:recipe_id", RecipesController.isFavourite);
router.get('/myrecipes/:user_id', RecipesController.getAllRecipesByUserId); 
module.exports = router;
