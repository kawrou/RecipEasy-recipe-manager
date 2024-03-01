const express = require("express");
const RecipesController = require("../controllers/recipes");

const router = express.Router();

router.get("/scrape-recipe", RecipesController.fetchRecipeData);

router.post("/recipes", RecipesController.create);

// router.patch("/editingPost/:postId", RecipesController.updateRecipe);

module.exports = router;