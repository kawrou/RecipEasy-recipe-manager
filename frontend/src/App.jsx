import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { RecipeCollection } from "./pages/RecipeCollection/RecipeCollection";
import Navbar from "./components/Navbar";
import RecipeScraper from "./components/RecipeScraper";
import { useState } from "react";
import { logout } from "./services/authentication";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);
  const [recipeData, setRecipeData] = useState(null);
// try passing token as a State
const [token, setToken] = useState(localStorage.getItem("token"));


  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setToken(null);
  };

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    // setToken(newToken);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/recipecollection" element={<RecipeCollection />} />
        <Route
          path="/recipe-scraper"
          element={
            <RecipeScraper
              // token={localStorage.getItem("token")}
              token={token}
            />
          }
        />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;