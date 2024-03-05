import React, { useState } from "react";
import { QuantitySelector } from "../QuantitySelector";

export const RecipeTimeTaken = ({ timeTaken, setTimeTaken, editMode }) => {
  return (
    <div className="flex items-center gap-1 px-3">
      <img src="../../src/assets/timeTakenIcon.svg" className="size-8" />
      {editMode ? (
        <QuantitySelector quantity={timeTaken} setQuantity={setTimeTaken} />
      ):(
        <div className="pl-2 align-middle text-gray-500">{timeTaken}</div>
      )}
      <div className="align-middle text-gray-500">mins</div>
    </div>
  );
};
