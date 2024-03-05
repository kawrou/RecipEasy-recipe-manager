import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeScraper.css";

const RecipeScraper = ({ url, handleUrlChange, handleScrapeRecipe }) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-scraper-container">
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        className="input-box"
        placeholder="Enter Recipe URL:"
      />
      <div className="flex items-center justify-center py-8">
        <button
          onClick={async () => {
            await handleScrapeRecipe();
            navigate("/recipes/create");
          }}
          type="button"
          className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        >
          Generate Recipe
        </button>
        <button
          type="submit"
          className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        >
          Enter Manually
        </button>
      </div>
    </div>
  );
};

export default RecipeScraper;
