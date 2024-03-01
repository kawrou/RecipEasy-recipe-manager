import React, { useState, useEffect } from 'react';
import { scrapeRecipe } from '../services/recipe';
import { useNavigate } from 'react-router-dom';
import "./RecipeScraper.css";
import { getUser } from "../services/users";

const RecipeScraper = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  // const [token, setToken] = useState(window.localStorage.removeItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [url, setUrl] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(token);
        setIsLoggedIn(!!user);
        console.log(token);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsLoggedIn(false);
      }
    };
  
    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleScrapeRecipe = async () => {
    console.log("Token:", token);
    console.log("URL:", url);
    if (token && url && isLoggedIn) {
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
        <div className="error-message">
          <p>
            You must log in to generate a recipe.{' '}
            <span onClick={redirectToLoginPage} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
              Click HERE to log in!
            </span>
            Don't have an account?{' '}
            <span onClick={redirectToSignupPage} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
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
