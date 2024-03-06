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

function extractRecipeInfo(recipeData) {
  let {
    name,
    description,
    recipeYield,
    keywords,
    recipeCuisine,
    recipeCategory,
    cookTime,
    prepTime,
    recipeIngredient,
    recipeInstructions,
    image,
  } = recipeData.recipe_data;

  recipeYield = parseYieldData(recipeYield);
  const totalTime = calculateTotalTime(cookTime, prepTime);
  const tags = parseKeywords(keywords);
  recipeInstructions = parseRecipeInstructionsData(recipeInstructions);
  image = parseImageData(image);

  return {
    name,
    description,
    recipeYield,
    tags,
    totalTime,
    recipeIngredient,
    recipeInstructions,
    image,
  };
}

function calculateTotalTime(cookTime, prepTime) {
  // Convert PT20M format to minutes
  const cookTimeInMinutes = cookTime
    ? parseInt(cookTime.substring(2, cookTime.length - 1))
    : 0;
  const prepTimeInMinutes = prepTime
    ? parseInt(prepTime.substring(2, prepTime.length - 1))
    : 0;
  return cookTimeInMinutes + prepTimeInMinutes;
}

function parseKeywords(keywords) {
  return keywords ? keywords.split(",").map((tag) => tag.trim()) : [];
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
