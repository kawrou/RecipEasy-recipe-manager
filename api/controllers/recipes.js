const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const { generateToken } = require("../lib/token");
const Recipe = require("../models/recipe");
const User = require("../models/user");
const { response } = require("../app");
const { extractRecipeInfo } = require("../utils/recipeUtils");

const fetchRecipeData = async (req, res) => {
  const url = req.query.url; // assigns url to a variable
  const newToken = generateToken(req.user_id);

  try {
    const response = await axios.get(url); // Use axios to get webpage and return a promise
    const html = response.data; // assign all webpage data to html variable

    //load the html tags into cheerio which is a library that has methods for finding and extracting html elements
    const $ = cheerio.load(html);

    //JSON-LD is being used to semantically markup the data, to make them become not only machine-readable,
    //but also machine-understanable by providing additional syntax to JSON for serialization of Linked Data.
    const jsonLD = $('script[type="application/ld+json"]');
    let recipeData;

    //jsonLD is a collection of HTML elements
    //each method from the cheerio library, takes a callback func with two parameters - index of the current element, and 'element' is reference to the current 'element'
    //you can access and manipulate the element using the 'element' parameter
    //console.log(`Element ${index}: ${element.html()}`); -> prints the html element and index to the console
    jsonLD.each((index, element) => {
      const scriptContent = $(element).html(); // Gets the html elements and assign it to a variable
      try {
        const jsonData = JSON.parse(scriptContent); //Turns the html elements into a JSON object with key/value pairs
        if (jsonData["@graph"]) {
          const recipeObjects = jsonData["@graph"].filter(
            (obj) => obj["@type"] === "Recipe"
          );
          recipeData = recipeObjects;
          // console.log("5: @graph - RecipeData", recipeData);
        } else if (jsonData["@type"] === "Recipe") {
          recipeData = jsonData;
          // console.log("5: @type - RecipeData", recipeData);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });

    // Failsafe - If axios and cheerio doesn't work, use puppeteer
    if (!recipeData || recipeData.length === 0) {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url);

      const jsonLdData = await page.$$eval(
        'script[type="application/ld+json"]',
        (scripts) => {
          let jsonData;

          scripts.forEach((script) => {
            try {
              const parsedData = JSON.parse(script.textContent);

              if (parsedData["@graph"]) {
                const recipeObjects = parsedData["@graph"].filter(
                  (obj) => obj["@type"] === "Recipe"
                );
                jsonData = recipeObjects;
              } else if (parsedData["@type"] === "Recipe") {
                jsonData = parsedData;
              }
            } catch (error) {
              console.error("Error parsing JSON-LD data:", error);
            }
          });
          return jsonData;
        }
      );

      recipeData = jsonLdData;

      await browser.close();
    }
    const filteredRecipeData = extractRecipeInfo(recipeData);
    res.status(200).json({ recipe_data: filteredRecipeData, token: newToken });
  } catch (error) {
    console.log(Object.keys(error));
    // console.error("Error fetching URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  // find the user who created the recipe
  const user = await User.findById(req.user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // console.log(req.body);
  // create recipe
  try {
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      ownerId: user._id,
      tags: req.body.tags,
      favouritedByOwner: req.body.favouritedByOwner,
      totalTime: req.body.totalTime,
      recipeYield: req.body.recipeYield,
      recipeIngredient: req.body.recipeIngredient,
      recipeInstructions: req.body.recipeInstructions,
      url: req.body.url,
      image: req.body.image,
      dateAdded: req.body.dateAdded,
      dateAdded: req.body.dateAdded,
    });
    await newRecipe.save();
    // console.log("New recipe created:", newRecipe._id.toString());
    const newToken = generateToken(req.user_id);
    res.status(201).json({
      message: "Recipe created successfully",
      recipe: newRecipe,
      token: newToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update existing recipe entry
const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipe_id;
    const user = await User.findById(req.user_id);
    if (!user) {
      console.log("user not found");
      return res.status(404).json({ message: "User not found" });
    }
    const recipeUpdateData = {
      name: req.body.name,
      description: req.body.description,
      ownerId: user._id,
      tags: req.body.tags,
      favouritedByOwner: req.body.favouritedByOwner,
      totalTime: req.body.totalTime,
      recipeYield: req.body.recipeYield,
      recipeIngredient: req.body.recipeIngredient,
      recipeInstructions: req.body.recipeInstructions,
      url: req.body.url,
      image: req.body.image,
      dateAdded: req.body.dateAdded,
    };

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, ownerId: user._id },
      { $set: recipeUpdateData },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const newToken = generateToken(req.user_id);
    res.status(200).json({
      message: "Recipe updated successfully",
      updatedRecipe,
      token: newToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const isFavourite = async (req, res) => {
  try {
    const recipeId = req.params.recipe_id;

    const user = await User.findById(req.user_id);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      console.log("Recipe not found");
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Toggle the favouritedByOwner field
    recipe.favouritedByOwner = !recipe.favouritedByOwner;

    // Save the updated recipe
    await recipe.save();
    console.log("Recipe saved successfully");

    res.status(200).json({ message: "Recipe favourited successfully", recipe });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRecipeById = async (req, res) => {
  const recipeId = req.params.recipe_id;
  const recipeData = await Recipe.findById(recipeId);
  const newToken = generateToken(req.user_id);
  res
    .status(200)
    .json({ recipeData: recipeData, user_id: req.user_id, token: newToken });
};

const getAllRecipesByUserId = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user_id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId  = user._id;
    const token = generateToken(req.user_id);
    const recipes = await Recipe.find({ ownerId: userId });
    res.status(200).json({ recipes: recipes, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const RecipesController = {
  fetchRecipeData: fetchRecipeData,
  create: create,
  updateRecipe: updateRecipe,
  isFavourite: isFavourite,
  getRecipeById: getRecipeById,
  getAllRecipesByUserId: getAllRecipesByUserId,
};


module.exports = RecipesController;
