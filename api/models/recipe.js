const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  tags: [{ type: String, required: true }],
  favouritedByOwner: { type: Boolean, required: true },
  totalTime: { type: Number, required: true },
  recipeYield: { type: Number, required: true },
  recipeIngredient: [{ type: String, required: true }],
  recipeInstructions: [{ type: String, required: true }],
  url: { type: String, required: false },
  image: { type: String, required: false },
  dateAdded: { type: Date, required: true },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
