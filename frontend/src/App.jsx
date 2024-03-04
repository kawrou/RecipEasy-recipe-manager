import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { scrapeRecipe } from "./services/recipe";

import "./App.css";
import HomePage from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { RecipePage } from "./pages/RecipePage/RecipePage";
import { RecipeCollection } from "./pages/RecipeCollection/RecipeCollection";
import Navbar from "./components/Navbar";

// docs: https://reactrouter.com/en/main/start/overview

const App = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [url, setUrl] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleScrapeRecipe = async () => {
    if (token && url) {
      try {
        const scrapedData = await scrapeRecipe(url);
        // const jsonScrapedData = JSON.stringify(scrapedData, null, 2)
        setRecipeData(scrapedData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  console.log(recipeData);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              handleScrapeRecipe={handleScrapeRecipe}
              token={token}
              setToken={setToken}
              url={url}
              handleUrlChange={handleUrlChange}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/recipes/create"
          element={<RecipePage newRecipe={true} recipeData={recipeData} />}
        />
        <Route
          path="/recipes/:recipe_id"
          element={<RecipePage newRecipe={false} />}
        />
        <Route path="/recipecollection" element={<RecipeCollection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
