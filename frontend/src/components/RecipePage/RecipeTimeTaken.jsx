import React, { useState } from "react";
import { QuantitySelector } from "./QuantitySelector";

export const RecipeTimeTaken = ({ timeTaken, setTimeTaken }) => {
  return (
    <div className="flex items-center gap-2 px-3">
      <img src="../../src/assets/timeTakenIcon.svg" className="size-8" />
      <QuantitySelector quantity={timeTaken} setQuantity={setTimeTaken} />
      <div className="align-middle text-gray-500">mins</div>
    </div>
  );
};
