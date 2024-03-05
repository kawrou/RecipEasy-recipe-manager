import React from "react";

export const RecipeImage = ({ imageUrl }) => {
  console.log(imageUrl)
  return (
    <div className="bg-gray-300 place-self-center w-full rounded-3xl aspect-square">
      {imageUrl && (
        <div
          className="bg-cover bg-center h-full w-full rounded-3xl"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      )}
    </div>
  );
};
