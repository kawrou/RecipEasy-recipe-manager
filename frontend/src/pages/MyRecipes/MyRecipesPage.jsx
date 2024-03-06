import { useNavigate } from "react-router-dom";
import { useFetchRecipes } from "../../hooks/useFetchRecipe";
import RecipeCard from "../../components/Recipe/RecipeCard";
import RecipeScraper from "../../components/RecipeScraper";

export const MyRecipes = ({
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
      return <p aria-label="Loading message">Loading ...</p>;
    } else if (error) {
      navigate("/login")
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
