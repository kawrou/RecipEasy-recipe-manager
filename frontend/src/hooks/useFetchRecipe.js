import { useState, useEffect } from "react";
import { getAllRecipes } from "../services/recipes";

export const useFetchRecipes = (token, setToken) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getAllRecipes(token);

        if (isMounted) {
          setRecipes(data.recipeData);
          setLoading(false);
          setToken(data.token);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [token, setToken]);

  return { recipes, loading, error };
};