import React, { useState } from "react";
import { QuantitySelector } from "../QuantitySelector";

export const RecipeYield = ({ recipeYield, setRecipeYield, editMode }) => {
  return (
    <div className="flex items-center gap-1 pr-2 text-lg font-kanit font-bold text-secondary-500">
      <img src="../../src/assets/servesIcon.svg" className="size-8" />
      <div className="align-middle pl-2 ">Serves</div>
      {editMode ? (
        <QuantitySelector quantity={recipeYield} setQuantity={setRecipeYield} />
      ):(
        <div className="align-middl">{recipeYield}</div>
      )}
      
    </div>
  );
};
