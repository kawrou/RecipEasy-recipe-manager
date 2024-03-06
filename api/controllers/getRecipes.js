const { response } = require("../app");
const { generateToken } = require("../lib/token");
const Recipe = require("../models/recipe");

const getAllRecipesByUserId = async (req, res) => {
  const userId = req.params.user_id;
  const token = generateToken(req.user_id);
  try{
  const recipes = await Recipe.find({ownerId: userId});
  res.status(200).json({recipes: recipes, token: token})
  }
  catch(error){
  res.status(500).json({error: error.message})
  }
};

const getRecipesController = {
  getAllRecipesByUserId,
};

module.exports = getRecipesController
