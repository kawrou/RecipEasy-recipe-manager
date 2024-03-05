// useFetchRecipes.js
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getRecipes } from "../services/getRecipes";
import { getRecipes } from '../services/recipes';

export const useFetchRecipes = (token) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        // navigate("/login"); // Uncomment this line if you want to navigate to login when there's no token
        return;
      }

      try {
        const data = await getRecipes(token);
        setRecipes(data.recipeData); // Adjust the property here
        setLoading(false);
        window.localStorage.setItem("token", data.token);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { recipes, loading, error };
};