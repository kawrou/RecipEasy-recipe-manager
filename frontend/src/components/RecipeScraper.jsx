import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeScraper.css";

const RecipeScraper = ({
  url,
  handleUrlChange,
  handleSubmit,
  handleScrapeRecipe,
}) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-scraper-container">
      {showErrorMessage && (
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
        <button
          onClick={async () => {
            await handleScrapeRecipe();
            navigate("/recipes/create");
          }}
          type="button" // Change type to button
          className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        >
          Generate Recipe
        </button>
        <button
          type="submit" // Keep this as submit type if it's meant to submit the form
          className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        >
          Enter Manually
        </button>
      </div>
    </form>
  );
};

export default RecipeScraper;