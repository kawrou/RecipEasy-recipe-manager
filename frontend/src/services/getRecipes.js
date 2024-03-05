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

// export const getRecipeById = async (token, recipeId) => {
//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await fetch(`${BACKEND_URL}/recipes/${recipeId}`, requestOptions);

//   if (response.status !== 200) {
//     throw new Error(`Unable to fetch recipe with ID ${recipeId}`);
//   }

//   const data = await response.json();
//   return data.recipe; 
// };