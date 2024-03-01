const express = require("express");
const RecipesController = require("../controllers/recipes");

const router = express.Router();

router.get("/scrape-recipe", RecipesController.fetchRecipeData);

router.post("/", RecipesController.create);

router.patch("/:recipe_id", RecipesController.updateRecipe);

module.exports = router;