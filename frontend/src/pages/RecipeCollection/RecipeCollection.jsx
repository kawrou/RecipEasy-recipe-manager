import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getRecipes } from "../../services/getRecipes";
import Post from "../../components/Recipe/RecipeCard";

export const RecipeCollection = () => {
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getRecipes(token)
        .then((data) => {
          setRecipes(data.recipes);
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.err(err);
        });
    } else {
      navigate("/login");
    }
  });

  if (!token) {
    return;
  }

  return (
    <>
      <h2>Recipes</h2>
      <div className="feed" role="feed">
        {recipes.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};
