// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getRecipes = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

export const toggleFavourite = async (recipeId, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content- Type": "application/json",
    },
    body: JSON.stringify({ recipeId }),
};

const response = await fetch(`${BACKEND_URL}/recipes/favouritedByOwner`, requestOptions);

if (response.status !== 200) {
  throw new Error("Failed to toggle favourite button")
}

  const data = await response.json();
  return data;
};
