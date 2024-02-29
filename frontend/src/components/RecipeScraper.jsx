import React, { useState, useEffect } from 'react';
import { scrapeRecipe } from '../services/recipe'; 
import { useNavigate, useParams  } from 'react-router-dom';
import "./RecipeScraper.css";
import { getUserById } from "../services/users";


const RecipeScraper = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [profileInfo, setProfileInfo] = useState("");
  const [userID, setUserID] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [url, setUrl] = useState('');
  const { profile_id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getUserById(profile_id, token)
        .then((data) => {
          setProfileInfo(data.user);
          setToken(data.token);
          setUserID(data.user_id);

          if (profile_id === userID) {
            setIsLoggedIn(true);
          }
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setShowErrorMessage(true);
    }
  }, [token]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleScrapeRecipe = async () => {
    if (!isLoggedIn) {
      setShowErrorMessage(true);
      return;
    }

    try {
      const scrapedData = await scrapeRecipe(url);
      setRecipeData(scrapedData);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const redirectToLoginPage = () => {
    navigate('/login'); 
  };

  const redirectToSignupPage = () => {
    navigate('/signup'); 
  };

  return (
    <div className="recipe-scrapper-container">
      {/* Move the error message outside the isLoggedIn check */}
      {showErrorMessage && !isLoggedIn && (
        <div className="error-message">
          <p>You must log in to generate a recipe.             <span onClick={redirectToLoginPage} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
              Click HERE to log in!
            </span>
            Don't have an account? 
            <span onClick={redirectToSignupPage} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
              Click HERE to sign up!
            </span></p>
        </div>
      )}

      {/* Always render the input box and buttons */}
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