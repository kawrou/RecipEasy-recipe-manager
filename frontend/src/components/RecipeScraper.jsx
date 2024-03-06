// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeScraper = ({
  url,
  handleUrlChange,
  handleScrapeRecipe,
}) => {
  const navigate = useNavigate();

  // if the user is logged in - generate a recipe, else redirect to login page
  const handleClick = async () => {
    if (localStorage.getItem('token')) {
      await handleScrapeRecipe();
      navigate('/recipes/create');
    } else {
      navigate('/login');
    }
  };

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
          aria-label="Generate"
          onClick={async () => {
            handleClick()
          }}
          type="button"
          className="font-kanit font-bold text-lg text-white bg-secondary-500 hover:bg-blue-900 bg- rounded-lg px-5 py-2"
        >
          Generate Recipe
        </button>
        <button
          aria-label="Manually"
          type="submit"
          className="font-kanit font-bold text-lg text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white rounded-lg px-5 py-2"
        >
          Enter Manually
        </button>
      </div>
    </div>
  );
};

export default RecipeScraper;
