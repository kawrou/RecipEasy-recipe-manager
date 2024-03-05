import React from "react";

export const RecipeUrl = ({ recipeUrl }) => {
  return (
    <>
      {recipeUrl && (
        <a href={recipeUrl} target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 hover:bg-blue-700 text-white place-self-center rounded-lg px-4 py-2 font-bold">
            Original recipe page
          </button>
        </a>
      )}
    </>
  );
};
