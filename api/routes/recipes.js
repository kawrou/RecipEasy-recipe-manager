const express = require("express");
const RecipesController = require("../controllers/recipes");

const router = express.Router();

//TODO:
// Move token checker back to app.js as all requests related to recipes will require tokenChecker
const tokenChecker = require("../middleware/tokenChecker");

router.get("/scrape-recipe",tokenChecker, RecipesController.fetchRecipeData);

router.post("/", RecipesController.create);

// patch request most suitable - https://www.geeksforgeeks.org/what-is-the-difference-between-put-post-and-patch-in-restful-api/
router.patch("/:recipe_id", RecipesController.updateRecipe);

module.exports = router;

