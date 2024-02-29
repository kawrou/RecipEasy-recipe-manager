import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa"; // Import icons from FontAwesome

export const IngredientList = ({ recipeIngredients, setRecipeIngredients }) => {
  const [newIngredient, setNewIngredient] = useState("");

  const handleAddIngredient = () => {
    // Add the new ingredient to the array
    setRecipeIngredients([...recipeIngredients, newIngredient]);
    // Clear the input field after adding
    setNewIngredient("");
  };

  const handleRemoveIngredient = (index) => {
    // Remove the ingredient at the specified index
    const updatedIngredients = [...recipeIngredients];
    updatedIngredients.splice(index, 1);
    setRecipeIngredients(updatedIngredients);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col divide-y-2">
        {recipeIngredients.map((ingredient, index) => (
          <div key={index} className="relative py-4">
            <input
              className="resize-none overflow-hidden placeholder:text-wrap w-full p-2.5 focus:outline-none text-md text-gray-900 bg-gray-50 rounded-xl border border-gray-300"
              value={ingredient}
              onChange={(e) => {
                const updatedIngredients = [...recipeIngredients];
                updatedIngredients[index] = e.target.value;
                setRecipeIngredients(updatedIngredients);
              }}
              placeholder="Enter your ingredient..."
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-white"
              onClick={() => handleRemoveIngredient(index)}
            >
              <FaTimes style={{ color: "gray" }} /> {/* Change color to gray */}
            </button>
          </div>
        ))}
      </div>

      {/* Input for new ingredient */}
      <div className="flex justify-center items-center">
        <div className="w-1/2 border border-gray-200" />{" "}
        {/* Horizontal divider */}
        <button
          className="px-2 py-1 rounded text-white"
          onClick={handleAddIngredient}
        >
          <FaPlus style={{ color: "gray" }} /> {/* Change color to gray */}
        </button>
        <div className="w-1/2 border border-gray-200" />{" "}
        {/* Horizontal divider */}
      </div>
    </div>
  );
};