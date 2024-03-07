import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFetchRecipes } from "../../hooks/useFetchRecipe";
import RecipeCard from "../../components/Recipe/RecipeCard";
import RecipeScraper from "../../components/RecipeScraper";

export const MyRecipesPage = ({
  handleScrapeRecipe,
  token,
  setToken,
  url,
  setUrl,
  handleUrlChange,
  setRecipeData
}) => {
  const navigate = useNavigate();
  const { recipes, loading, error, fetchRecipes } = useFetchRecipes(
    token,
    setToken
  );

  useEffect(() => {
    fetchRecipes(); // Fetch recipes when the component mounts or when the token changes
  }, [fetchRecipes]);

  const renderPageContent = () => {
    if (!loading && !token) {
      navigate("/login");
    } else if (loading) {
      return <p aria-label="Loading message">Loading ...</p>;
    } else if (error) {
      navigate("/login");
      // return <p>Error: {error.message}</p>;
    } else if (
      (!loading && !error && recipes === undefined) ||
      recipes.length === 0
    ) {
      return <p aria-label="Empty Recipes"> No recipes found</p>;
    } else {
      return recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe._id} />
      ));
    }
  };

  return (
    <>
      <h1>Add a recipe</h1>
      <p aria-label="Scrape Input Description">
        Enter a url of your favourite recipe
      </p>
      <RecipeScraper
        token={token}
        url={url}
        setUrl={setUrl}
        handleUrlChange={handleUrlChange}
        handleScrapeRecipe={handleScrapeRecipe}
        setRecipeData={setRecipeData}
      />
      <h2> My Recipes</h2>
      <div className="grid grid-cols-4 gap-2" role="feed">
        {renderPageContent()}
      </div>
    </>
  );
};
