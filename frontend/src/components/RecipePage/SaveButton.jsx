import React from "react";
import { FaSave } from "react-icons/fa";

export const SaveButton = ({ handleSaveRecipe }) => {
  return (
    <button
      className={
        "fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 px-4 rounded-lg flex items-center"
      }
      onClick={handleSaveRecipe}
    >
      <>
        <FaSave className="mr-2" />
        Save
      </>
    </button>
  );
};
