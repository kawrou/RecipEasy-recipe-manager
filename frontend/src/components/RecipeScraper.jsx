import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeScraper = ({
  url,
  handleUrlChange,
  handleSubmit,
  handleScrapeRecipe,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full pt-5">
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        className="font-poppins font-light w-full border rounded-lg py-2 px-2 focus:outline-none"
        placeholder="Enter your recipe url..."
      />
      <div className="flex items-center justify-center py-5 gap-5">
        <button
          onClick={async () => {
            await handleScrapeRecipe();
            navigate("/recipes/create");
          }}
          type="button" // Change type to button
          className="font-kanit font-bold text-lg text-white bg-secondary-500 hover:bg-blue-900 bg- rounded-lg px-5 py-2"
        >
          Generate Recipe
        </button>
        <button
          type="submit" // Keep this as submit type if it's meant to submit the form
          className="font-kanit font-bold text-lg text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white rounded-lg px-5 py-2"
        >
          Enter Manually
        </button>
      </div>
    </div>
  );
};

export default RecipeScraper;
