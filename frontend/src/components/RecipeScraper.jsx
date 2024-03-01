import React, { useState, useEffect } from 'react';
import { scrapeRecipe } from '../services/recipe';
import { useNavigate } from 'react-router-dom';
import "./RecipeScraper.css";
import { getUser } from "../services/users";

const RecipeScraper = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [url, setUrl] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate(); 



  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const fetchUser = async () => {
      try {
        const user = await getUser(storedToken);
        setIsLoggedIn(!!user);
        console.log(storedToken);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsLoggedIn(false);
      }
    };
  
    if (storedToken) {
      fetchUser();
    }
  }, []);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleScrapeRecipe = async () => {
    console.log("Token:", token);
    console.log("URL:", url);
    if (token && isLoggedIn && url) {
      try {
        const scrapedData = await scrapeRecipe(url, token);
        console.log(scrapedData)
        setRecipeData(scrapedData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    } else {
      // Show error message if not logged in
      setShowErrorMessage(true);
    }
  };

  const redirectToLoginPage = () => {
    navigate('/login');
  };

  const redirectToSignupPage = () => {
    navigate('/signup');
  };

  return (
    <div className="recipe-scraper-container">
      {showErrorMessage && !isLoggedIn && (
        <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <p>
            You must log in to generate a recipe.{' '}
            <span
              onClick={redirectToLoginPage}
              className="cursor-pointer text-blue-500 underline"
            >
              Click HERE to log in!
            </span>{' '}
            Don't have an account?{' '}
            <span
              onClick={redirectToSignupPage}
              className="cursor-pointer text-blue-500 underline"
            >
              Click HERE to sign up!
            </span>
          </p>
        </div>
      )}

      <input type="text" value={url} onChange={handleUrlChange} className="input-box" placeholder="Enter Recipe URL:" />
      <div className="flex items-center justify-center py-8">
        <button onClick={handleScrapeRecipe} type="submit" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Generate Recipe</button>
        <button type="submit" className="focus:outline-none text-darkGray border border-gray-500 hover:border-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-white dark:bg-gray-800">Enter Manually</button>
      </div>

      {isLoggedIn && (
        <>
          {recipeData && (
            <div>
              <h2>Recipe Data</h2>
              <pre>{JSON.stringify(recipeData, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeScraper;
