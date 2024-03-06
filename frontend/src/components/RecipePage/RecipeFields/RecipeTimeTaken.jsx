import React, { useState } from "react";
import { QuantitySelector } from "../QuantitySelector";

export const RecipeTimeTaken = ({ timeTaken, setTimeTaken, editMode }) => {
  return (
    <div className="flex items-center gap-1 px-3 text-lg font-kanit font-bold text-secondary-500">
      <img src="../../src/assets/timeTakenIcon.svg" className="size-8" />
      {editMode ? (
        <QuantitySelector quantity={timeTaken} setQuantity={setTimeTaken} />
      ):(
        <div className="pl-2 align-middle">{timeTaken}</div>
      )}
      <div className="align-middle ">mins</div>
    </div>
  );
};
