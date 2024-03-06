import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { scrapeRecipe } from "./services/recipes";

import "./App.css";
import HomePage from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { SingleRecipePage } from "./pages/RecipePage/SingleRecipePage";
import { CreateRecipePage } from "./pages/RecipePage/CreateRecipePage";
import { RecipeCollection } from "./pages/MyRecipes/MyRecipesPage";
import Navbar from "./components/Navbar";
import { logout } from "./services/authentication";

const App = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const handleScrapeRecipe = async () => {
    console.log("Token:", token);
    console.log("URL:", url);
    try {
      const scrapedData = await scrapeRecipe(url, token);
      console.log(scrapedData);
      setRecipeData(scrapedData);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleLogout = async () => {
    await logout();
    setToken(null);
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };

  const handleLogin = (token) => {
    setIsLoggedIn(token !== null);
    console.log('token - ', token)
    setToken(token);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
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
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/recipes/create"
          element={
            <CreateRecipePage
              recipeData={recipeData}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path="/recipes/:recipe_id"
          element={<SingleRecipePage token={token} setToken={setToken} />}
        />
        <Route
          path="/myrecipes"
          element={
            <RecipeCollection
              handleScrapeRecipe={handleScrapeRecipe}
              token={token}
              setToken={setToken}
              url={url}
              handleUrlChange={handleUrlChange}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
