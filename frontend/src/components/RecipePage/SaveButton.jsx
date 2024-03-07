import React from "react";
import { FaSave } from "react-icons/fa";

export const SaveButton = ({ handleSaveRecipe }) => {
  return (
    <button
      className="fixed bottom-10 right-10 bg-secondary-500 hover:bg-blue-900 text-white font-kanit font-bold text-lg h-12 px-4 rounded-lg flex items-center shadow-md"
      onClick={handleSaveRecipe}
    >
      <>
        <FaSave className="mr-2" />
        Save
      </>
    </button>
  );
};
