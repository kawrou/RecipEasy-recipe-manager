import React, { useState } from 'react';
import { scrapeRecipe } from '../services/recipe'; 
import "./RecipeScraper.css";


const RecipeScraper = () => {
  const [url, setUrl] = useState('');
  const [recipeData, setRecipeData] = useState(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleScrapeRecipe = async () => {
    try {
      const scrapedData = await scrapeRecipe(url);
      setRecipeData(scrapedData);
      // console.log(scrapedData);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  return (
    <div class="recipe-scrapper-container">
        <input type="text" value={url} onChange={handleUrlChange} class="input-box" placeholder="Enter Recipe URL:" />
      <div className="flex items-center justify-center py-8">
      <button onClick={handleScrapeRecipe} type="submit" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Generate Recipe</button>
      <button type="submit" className="focus:outline-none text-darkGray border border-gray-500 hover:border-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-white dark:bg-gray-800">Enter Manually</button>
        </div>

      {recipeData && (
        <div>
          <h2>Recipe Data</h2>
          <pre>{JSON.stringify(recipeData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RecipeScraper;
