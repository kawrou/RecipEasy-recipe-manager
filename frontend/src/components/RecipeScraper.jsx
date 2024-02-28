import React, { useState } from 'react';
import { scrapeRecipe } from '../services/recipe'; 


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
    <div>
      <h1>Recipe Scraper</h1>
      <label>
        Enter Recipe URL:
        <input type="text" value={url} onChange={handleUrlChange} />
      </label>
      <button onClick={handleScrapeRecipe}>Scrape Recipe</button>

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
