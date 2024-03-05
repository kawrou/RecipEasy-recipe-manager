// useFetchRecipes.js
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getRecipes } from "../services/getRecipes";

export const useFetchRecipes = (token, setToken) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getRecipes(token);
        setRecipes(data.recipes);
        setLoading(false);
        setToken(data.token);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { recipes, loading, error };
};
