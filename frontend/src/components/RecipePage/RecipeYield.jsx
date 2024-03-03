import React, { useState } from "react";
import { QuantitySelector } from "./QuantitySelector";

export const RecipeYield = ({ recipeYield, setRecipeYield }) => {
  return (
    <div className="flex items-center gap-2 px-2">
      <img src="../../src/assets/servesIcon.svg" className="size-8" />
      <div className="align-middle text-gray-500">Serves</div>
      <QuantitySelector quantity={recipeYield} setQuantity={setRecipeYield} />
    </div>
  );
};
