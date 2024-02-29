import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getRecipes } from "../../services/getRecipes";
import RecipeCard from "../../components/Recipe/RecipeCard";
import RecipeScraper from "../../components/RecipeScraper";

export const RecipeCollection = () => {
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState("Henry");
  const navigate = useNavigate();

  //We need to fetch the recipes from the DB and populate it in our useState
  //The fetch request is made by passing a token for authentication

  // useEffect(() => {
  //   if (token) {
  //     console.log(token)
  //     getRecipes(token)
  //       .then((data) => {
  //         console.log(data)
  //         setRecipes(data.recipes);
  //         setToken(data.token);
  //         window.localStorage.setItem("token", data.token);
  //         console.log(recipes)
  //       })
  //       .catch((err) => {
  //         console.err(err);
  //       });
  //   // } else {
  //   //   navigate("/login");
  //   }
  // }, [token]);

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) {
      getRecipes(token).then((data) => {
        console.log(data)
        setRecipes(data.recipes);
        window.localStorage.setItem('token', data.token); 
      });
    }
  }, [token]);

  useEffect(() => {
    console.log(recipes)
  }, [recipes])

  return (
    <>
      <h1>Add a recipe</h1>
      <p data-testid="searchBarDescription">
        Enter a url of your favourite recipe
      </p>
      <RecipeScraper />
      <p>{token}</p>
      <p>{recipes}</p>
      <h2> My Recipes</h2>
      <div className="feed" role="feed">
        {/* {recipes.map((recipe) => (
          <RecipeCard post={recipe} key={recipe._id} />
        ))} */}
      </div>
    </>
  );
};

// RENDER:
// should have a NavBar at the top
// Should have a h1 with "Add a recipe"
// Should have a <p> tag with "Enter a url for your favourite recipe"
// Should have an h2 tag with "My Recipes"

// BEHAVIOUR:
// Should be able to loop through a collection of saved recipes on the backend
// Display these recipes with card components in a grid using flex

// should navigate to Recipe page when 'Generate Recipe' is clicked
// should navigate to Recipe page when 'Enter Manually' is clicked

// useEffect(() => {
//   if (token) {
//     getRecipes(token).then((data) => {
//       console.log(data.recipes);
//       console.log(data.token);
//       setRecipes(["test"]);
//       setToken("some token");
//       window.localStorage.setItem("token", data.token);
//     });
//   }
// }, [token]);

// if (!token) {
//   return;
// }
