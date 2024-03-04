import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchRecipes } from "../../hooks/useFetchRecipe";
import { getRecipes } from "../../services/getRecipes";
import RecipeCard from "../../components/Recipe/RecipeCard";
import RecipeScraper from "../../components/RecipeScraper";

export const RecipeCollection = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const { recipes, loading, error } = useFetchRecipes(token);

  // if (recipes == undefined) {
  //   console.log("recipes is undefined");
  // }else{
  //   console.log(recipes)
  // }

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

  const renderPageContent = () => {
    if (loading) {
      return <p>Loading ...</p>;
    } else if (error) {
      return <p>Error: {error.message}</p>;
    } else if (!loading && !error && recipes === undefined || recipes.length === 0) {
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
        token={token}
        url={url}
        setUrl={setUrl}
        handleUrlChange={handleUrlChange}
        handleSubmit={handleSubmit}
      />
      <h2> My Recipes</h2>
      <div className="feed" role="feed">
        {renderPageContent()}
      </div>
    </>
  );
};


// not confident that the above custom hook will work correctly
// const [recipes, setRecipes] = useState([]);
// const [token, setToken] = useState(window.localStorage.getItem("token"));
// const [url, setUrl] = useState("");
// const navigate = useNavigate();

// useEffect(() => {
//   if (token) {
//     getRecipes(token)
//       .then((data) => {
//         setRecipes(data.recipes);
//         setToken(data.token);
//         window.localStorage.setItem("token", data.token);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
//     else {
//     navigate("/login");
//   }
// }, [token]);
