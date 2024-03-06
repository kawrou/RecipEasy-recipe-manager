//We can start filtering recipeData here.
// We want:
// Recipe title - (name)
// recipe description - (description)
// servings - (recipeYield)
// tags - (keywords)
// time - (cookTime, prepTime)
// ingredients - (recipeIngredient)
// instructions - (recipeInstructions)
// url - (mainEntityOfPage)
// image - (image)
const { parse } = require("iso8601-duration");

function extractRecipeInfo(recipeData) {
  let {
    name,
    description,
    recipeYield,
    keywords,
    recipeCuisine,
    recipeCategory,
    totalTime,
    cookTime,
    prepTime,
    recipeIngredient,
    recipeInstructions,
    image,
  } = recipeData.recipe_data;

  recipeYield = parseYieldData(recipeYield);
  totalTime = calculateTotalTime(cookTime, prepTime);
  const tags = generateTags(recipeCuisine, recipeCategory, keywords);
  recipeInstructions = parseRecipeInstructionsData(recipeInstructions);
  image = parseImageData(image);

  return {
    name: name || "",
    description: description || "",
    recipeYield,
    tags,
    totalTime,
    recipeIngredient: recipeIngredient || [],
    recipeInstructions,
    image,
  };
}

function calculateTotalTime(cookTime, prepTime, totalTime) {
  // Convert cookTime and prepTime to minutes
  let cookTimeInMinutes = 0;
  let prepTimeInMinutes = 0;

  if (cookTime) {
    const { hours, minutes } = parse(cookTime);
    cookTimeInMinutes = hours * 60 + minutes;
  }

  if (prepTime) {
    const { hours, minutes } = parse(prepTime);
    prepTimeInMinutes = hours * 60 + minutes;
  }

  // If totalTime is provided, return it
  if (totalTime) {
    return totalTime;
  }

  // If either cookTime or prepTime exists, return the sum of both
  if (cookTime || prepTime) {
    return cookTimeInMinutes + prepTimeInMinutes;
  }

  // If none of them exist, return zero
  return 0;
}

function generateTags(recipeCuisine, recipeCategory, keywords) {
  let tags = [];

  // Look for recipeCuisine
  if (recipeCuisine) {
    tags.push(recipeCuisine);
  }

  // Look for recipeCategory
  if (recipeCategory) {
    const categories = recipeCategory.split(", ");
    tags = [...tags, ...categories];
  }

  // Look for keywords
  if (keywords) {
    const keywordsfield = keywords.split(", ");
    tags = [...tags, ...keywordsfield];
  }

  // Remove duplicates
  tags = [...new Set(tags)];

  return tags;
}

function parseImageData(image) {
  if (typeof image === "object" && image.hasOwnProperty("url")) {
    return image.url;
  } else if (
    Array.isArray(image) &&
    image.length > 0 &&
    typeof imageField[0] === "string"
  ) {
    // If imageField is an array of URL strings, return the first URL
    return imageField[0];
  } else {
    return image;
  }
}

function parseYieldData(recipeYield) {
  if (typeof recipeYield === "string") {
    // Extracting the number from the string
    const match = recipeYield.match(/\d+/);
    // If a number is found in the string, return it
    if (match) {
      return parseInt(match[0]);
    } else {
      // If no number found, return 0
      return 0;
    }
  } else if (typeof recipeYield === "number") {
    // If it's already a number, return it
    return recipeYield;
  } else {
    // If it's neither a string nor a number, return 0
    return 0;
  }
}

function parseRecipeInstructionsData(recipeInstructions) {
  if (Array.isArray(recipeInstructions)) {
    // Check if every element is a string
    if (
      recipeInstructions.every((instruction) => typeof instruction === "string")
    ) {
      return recipeInstructions;
    } else {
      // Extract text from objects
      return recipeInstructions.map((instruction) => instruction.text);
    }
  } else {
    // If it's not an array, return an empty array
    return [];
  }
}

module.exports = { extractRecipeInfo };
