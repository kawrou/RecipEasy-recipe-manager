import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchRecipes } from "../../hooks/useFetchRecipe";
import { getRecipes } from "../../services/getRecipes";
import RecipeCard from "../../components/Recipe/RecipeCard";
import RecipeScraper from "../../components/RecipeScraper";

export const RecipeCollection = ({
  handleScrapeRecipe,
  token,
  setToken,
  url,
  handleUrlChange,
}) => {
  const navigate = useNavigate();
  const { recipes, loading, error } = useFetchRecipes(token, setToken);

  const renderPageContent = () => {
    if (!loading && !token) {
      navigate("/login");
    } else if (loading) {
      return <p>Loading ...</p>;
    } else if (error) {
      navigate("/login")
      // return <p>Error: {error.message}</p>;
    } else if (
      (!loading && !error && recipes === undefined) ||
      recipes.length === 0
    ) {
      return <p> No recipes found</p>;
    } else {
      return recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe._id} />
      ));
    }
  };

  return (
    <>
      <h1>Add a recipe</h1>
      <p data-testid="searchBarDescription">
        Enter a url of your favourite recipe
      </p>
      <RecipeScraper
        // token={token}
        url={url}
        handleUrlChange={handleUrlChange}
        handleScrapeRecipe={handleScrapeRecipe}
      />
      <h2> My Recipes</h2>
      <div className="feed" role="feed">
        {renderPageContent()}
      </div>
    </>
  );
};
