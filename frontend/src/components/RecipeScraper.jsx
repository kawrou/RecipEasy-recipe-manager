import React, { useState } from "react";
import { scrapeRecipe } from "../services/recipe";
import "./RecipeScraper.css";

const RecipeScraper = ({ url, handleUrlChange, handleSubmit, token }) => {
  const [recipeData, setRecipeData] = useState(null);

  // COMMENT CAN BE DELETED AFTER REVIEWED
  // Component only handles the FETCH call
  // I think that the call should only be made if a token is present
  // Otherwise the call will be made even though the user isn't logged in
  const handleScrapeRecipe = async () => {
    if (token && url) {
      try {
        const scrapedData = await scrapeRecipe(url);
        setRecipeData(scrapedData);
        // console.log(scrapedData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }
  };

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
          onClick={handleScrapeRecipe}
          type="submit"
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

      {/* {recipeData && (
        <div>
          <h2>Recipe Data</h2>
          <pre>{JSON.stringify(recipeData, null, 2)}</pre>
        </div>
      )} */}
    </form>
  );
};

export default RecipeScraper;
