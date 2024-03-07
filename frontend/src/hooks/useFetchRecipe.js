import { useState, useEffect, useCallback } from "react";
import { getAllRecipes } from "../services/recipes";

export const useFetchRecipes = (token, setToken) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await getAllRecipes(token);
      setRecipes(data.recipes);
      setLoading(false);
      setToken(data.token);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  }, [token, setToken]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return { recipes, loading, error, fetchRecipes };
};
