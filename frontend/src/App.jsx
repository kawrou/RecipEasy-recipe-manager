import { BrowserRouter, Route, Routes } from "react-router-dom";
import { scrapeRecipe } from "./services/recipes";

import "./App.css";
import HomePage from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { SingleRecipePage } from "./pages/RecipePage/SingleRecipePage";
import { CreateRecipePage } from "./pages/RecipePage/CreateRecipePage";
import { MyRecipesPage } from "./pages/MyRecipes/MyRecipesPage";
import Navbar from "./components/Navbar";
import RecipeScraper from "./components/RecipeScraper";
import { useState } from "react";
import { logout } from "./services/authentication";

const App = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const handleScrapeRecipe = async () => {
    try {
      const scrapedData = await scrapeRecipe(url, token);
      setRecipeData(scrapedData.recipe_data);
      setToken(scrapedData.token);
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
    // set token state and isLoggedIn to true if token is returned
    setIsLoggedIn(token !== null);
    setToken(token);
  };

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              handleScrapeRecipe={handleScrapeRecipe}
              token={token}
              url={url}
              setUrl={setUrl}
              handleUrlChange={handleUrlChange}
              setRecipeData={setRecipeData}
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
              setRecipeData={setRecipeData}
              token={token}
              setToken={setToken}
              url={url}
            />
          }
        />
        <Route
          path="/recipes/:recipe_id"
          element={<SingleRecipePage token={token} setToken={setToken} url={url} />}
        />
        <Route
          path="/recipes/favouritedByOwner/:recipe_id"
          element={<SingleRecipePage token={token} setToken={setToken} />}
        />
        <Route
          path="/myrecipes"
          element={
            <MyRecipesPage
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
    </div>
    
  );
};

export default App;
