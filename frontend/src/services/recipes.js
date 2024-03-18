const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const scrapeRecipe = async (url, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      `${BACKEND_URL}/recipes/scrape-recipe?url=${encodeURIComponent(url)}`,
      requestOptions
    );

    if (response.status !== 200) {
      throw new Error("Unable to make GET request for fetch recipe");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

export const createRecipe = async (
  token,
  name,
  description,
  tags,
  totalTime,
  recipeYield,
  recipeIngredient,
  recipeInstructions,
  url,
  image
) => {
  const payload = {
    name: name,
    description: description,
    tags: tags,
    favouritedByOwner: false,
    totalTime: totalTime,
    recipeYield: recipeYield,
    recipeIngredient: recipeIngredient,
    recipeInstructions: recipeInstructions,
    url: url,
    image: image,
    dateAdded: new Date().toISOString(),
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(`${BACKEND_URL}/recipes/`, requestOptions);

    if (response.status !== 201) {
      throw new Error("Error saving new recipe");
    }
  } catch (error) {
    console.error("Error saving recipe:", error);
    throw error;
  }

  const data = await response.json();
  return data;
};

export const updateRecipe = async (
  token,
  recipeId,
  name,
  description,
  tags,
  totalTime,
  recipeYield,
  recipeIngredient,
  recipeInstructions,
  url,
  image
) => {
  const payload = {
    name: name,
    description: description,
    tags: tags,
    favouritedByOwner: false,
    totalTime: totalTime,
    recipeYield: recipeYield,
    recipeIngredient: recipeIngredient,
    recipeInstructions: recipeInstructions,
    url: url,
    image: image,
    dateAdded: new Date().toISOString(),
  };

  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/recipes/${recipeId}`,
      requestOptions
    );

    if (response.status !== 200) {
      throw new Error("Error updating recipe");
    }
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }

  const data = await response.json();
  return data;
};

export const getRecipeById = async (recipeId, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/recipes/${recipeId}`,
      requestOptions
    );

    if (response.status !== 200) {
      throw new Error("Unable to get recipe. Does this recipe exist?");
    }
  } catch (error) {
    console.error("Error getting recipe by ID:", error);
    throw error;
  }

  const data = await response.json();
  return data;
};

export const toggleFavourite = async (recipeId, token) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/recipes/favouritedByOwner/${recipeId}`,
      requestOptions
    );

    if (response.status !== 200) {
      throw new Error("Failed to toggle favourite button");
    }
  } catch (error) {
    console.error("Error favouriting recipe:", error);
    throw error;
  }

  const data = await response.json();
  return data;
};

export const getAllRecipes = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${BACKEND_URL}/recipes`, requestOptions);

    if (response.status !== 200) {
      throw new Error("Unable to fetch recipes");
    }
  } catch (error) {
    console.error("Error retrieving all recipes:", error);
    throw error;
  }

  const data = await response.json();
  return data;
};
