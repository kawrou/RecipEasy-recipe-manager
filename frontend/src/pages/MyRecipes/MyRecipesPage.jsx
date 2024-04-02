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
  setRecipeData,
}) => {
  const navigate = useNavigate();
  //TODO: There might be a bug with useFetchRecipes
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
      console.log("Error occured whilst retrieving recipe")
      navigate("/login");
      // return <p>Error: {error.message}</p>;
    } else if (
      (!loading && !error && recipes === undefined) ||
      recipes.length === 0
    ) {
      return <p aria-label="Empty Recipes"> No recipes found.</p>;
    } else {
      return recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe._id} />
      ));
    }
  };

  return (
    <div className="flex flex-col items-center bg-tertiary-500">
      <div className="flex justify-center bg-white shadow-md">
        <div className="flex flex-col items-center w-1/2 py-10 px-20">
          <h1 className="flex items-center mb-6 text-5xl font-kanit font-bold italic text-primary-500">
            <img
              className="w-16 mb-1.5 -mr-0.5"
              src="../../../src/assets/recipeasyLogo.svg"
              alt="logo"
            />
            ecipeasy
          </h1>
          <p
            aria-label="Page Instructions"
            className="font-poppins py-5 font-extralight text-sm text-gray-600"
          >
            Simply paste the URL of your favourite recipe page, or manually
            input your cherished recipes, and watch as Recipeasy effortlessly
            generates neatly organised recipes for you to store and access
            anytime, anywhere.
          </p>
          <RecipeScraper
            token={token}
            url={url}
            setUrl={setUrl}
            handleUrlChange={handleUrlChange}
            handleScrapeRecipe={handleScrapeRecipe}
            setRecipeData={setRecipeData}
          />
        </div>
      </div>

      <div className="flex flex-col items-center mx-20 my-10">
        <h2 className="font-kanit font-extrabold text-5xl text-primary-500 bg-white w-fit px-5 py-3 mb-6 rounded-3xl shadow-md">
          {" "}
          My Recipes
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 flex-wrap" role="feed">
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
};
