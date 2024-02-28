const express = require("express");
const RecipesController = require("../controllers/RecipeScraper");

const router = express.Router();

router.get("/scrape-recipe", RecipesController);

module.exports = router;