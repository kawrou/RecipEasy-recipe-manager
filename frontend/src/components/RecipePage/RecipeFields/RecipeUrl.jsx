import React from "react";

export const RecipeUrl = ({ recipeUrl }) => {
  return (
    <>
      {recipeUrl && (
        <a href={recipeUrl} target="_blank" rel="noopener noreferrer">
          <button className="font-kanit font-bold text-lg bg-secondary-500 hover:bg-blue-900 text-white place-self-center rounded-lg px-4 py-2">
            Original recipe page
          </button>
        </a>
      )}
    </>
  );
};
