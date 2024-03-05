const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const scrapeRecipe = async (url, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${BACKEND_URL}/recipes/scrape-recipe?url=${encodeURIComponent(url)}`, requestOptions);
  

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


export const toggleFavourite = async (recipeId, token) => {
  console.log('Toggling favourite for recipe ID:', recipeId);
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipeId }),
};
console.log('Sending request to server...');
const response = await fetch(`${BACKEND_URL}/recipes/favouritedByOwner/${recipeId}`, requestOptions);

if (response.status !== 200) {
  throw new Error("Failed to toggle favourite button")
}

console.log('Toggle favourite successful')
  const data = await response.json();
  console.log('Response data:', data);
  return data;
};
