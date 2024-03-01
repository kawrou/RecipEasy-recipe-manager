import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getRecipes } from "../../services/getRecipes";
import RecipeCard from "../../components/Recipe/RecipeCard";
import RecipeScraper from "../../components/RecipeScraper";

export const RecipeCollection = () => {
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  //We need to fetch the recipes from the DB and populate it in our useState
  //The fetch request is made by passing a token for authentication

  useEffect(() => {
    if (token) {
      getRecipes(token)
        .then((data) => {
          setRecipes(data.recipes);
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
        });
    }
      else {
      navigate("/login");
    }
  }, [token]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token && url) {
      navigate("/recipe");
    } else if (token) {
      navigate("/recipe");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <h1>Add a recipe</h1>
      <p data-testid="searchBarDescription">
        Enter a url of your favourite recipe
      </p>
      <RecipeScraper
        token={token}
        url={url}
        setUrl={setUrl}
        handleUrlChange={handleUrlChange}
        handleSubmit={handleSubmit}
      />
      <h2> My Recipes</h2>
      <div className="feed" role="feed">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id} />
        ))}
      </div>
    </>
  );
};
