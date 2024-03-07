// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../services/authentication";

const RecipeScraper = ({
  url,
  handleUrlChange,
  handleScrapeRecipe,
  setRecipeData,
}) => {
  const navigate = useNavigate();

  const handleClick = async (manual) => {
    try {
      // check user is logged in with valid token - if not, redirect to /login
      await checkToken(window.localStorage.getItem("token"));
      if (!manual) {
        await handleScrapeRecipe();
      } else {
        setRecipeData(null);
      }
      navigate("/recipes/create");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full pt-5">
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        className="font-poppins font-light w-full border rounded-lg py-2 px-2 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none"
        placeholder="Enter your recipe url..."
      />
      <div className="flex items-center justify-center py-5 gap-5">
        <button
          aria-label="Generate"
          onClick={async () => {
            handleClick(false);
          }}
          type="button"
          className="font-kanit font-bold text-lg text-white bg-secondary-500 hover:bg-blue-900 bg- rounded-lg px-5 py-2"
        >
          Generate Recipe
        </button>
        <button
          aria-label="Manually"
          type="button"
          onClick={async () => {
            handleClick(true);
          }}
          className="font-kanit font-bold text-lg text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white rounded-lg px-5 py-2"
        >
          Enter Manually
        </button>
      </div>
    </div>
  );
};

export default RecipeScraper;
