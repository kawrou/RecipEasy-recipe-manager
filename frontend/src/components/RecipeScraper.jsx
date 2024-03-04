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
    <form className="recipe-scrapper-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        className="input-box"
        placeholder="Enter your recipe URL"
        name="url-input"
      />
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
