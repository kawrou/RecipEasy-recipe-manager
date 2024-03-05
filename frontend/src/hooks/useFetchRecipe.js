// useFetchRecipes.js
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getRecipes } from "../services/getRecipes";

export const useFetchRecipes = (token) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        // navigate("/login");
        return;
      }

      try {
        const data = await getRecipes(token);
        setRecipes(data.recipes);
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
