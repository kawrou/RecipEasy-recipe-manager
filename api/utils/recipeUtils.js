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
  const {
    name,
    description,
    recipeYield,
    keywords,
    cookTime,
    prepTime,
    recipeIngredient,
    recipeInstructions,
    mainEntityOfPage,
    image,
  } = recipeData.recipe_data;

  const totalTime = calculateTotalTime(cookTime, prepTime);
  const tags = parseKeywords(keywords);

  return {
    name,
    description,
    recipeYield,
    tags,
    totalTime,
    recipeIngredient,
    recipeInstructions,
    mainEntityOfPage,
    image,
  };
}

// Convert PT20M format to minutes
function calculateTotalTime(cookTime, prepTime) {
  const cookTimeInMinutes = cookTime
    ? parseInt(cookTime.substring(2, cookTime.length - 1))
    : 0;
  const prepTimeInMinutes = prepTime
    ? parseInt(prepTime.substring(2, prepTime.lenght - 1))
    : 0;
  return cookTimeInMinutes + prepTimeInMinutes;
}

function parseKeywords(keywords) {
  return keywords ? keywords.split(",").map((tag) => tag.trim()) : [];
}

module.exports = { extractRecipeInfo };
