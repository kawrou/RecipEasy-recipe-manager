// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//TODO: DELETE
export const getAllRecipes = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/recipes`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch recipes");
  }

  const data = await response.json();
  return data;
};
