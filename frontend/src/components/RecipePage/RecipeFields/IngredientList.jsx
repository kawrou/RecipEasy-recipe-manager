import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa"; // Import icons from FontAwesome

export const IngredientList = ({ recipeIngredients, setRecipeIngredients, editMode }) => {
  const [newIngredient, setNewIngredient] = useState("");

  const handleAddIngredient = () => {
    if (recipeIngredients.some((ingredient) => ingredient === "")) {
      alert(
        "Please fill in all previous fields before adding a new ingredient."
      );
      return;
    }

    setRecipeIngredients([...recipeIngredients, newIngredient]);
    setNewIngredient("");
  };

  const handleRemoveIngredient = (index) => {
    // Remove the ingredient at the specified index
    const updatedIngredients = [...recipeIngredients];
    updatedIngredients.splice(index, 1);
    setRecipeIngredients(updatedIngredients);
  };

  return (
    <div className="flex w-1/2 flex-col pt-16 p-20 gap-7 rounded-3xl bg-white ml-5 mr-2.5 mb-20 h-fit">
      <div className="font-kanit font-extrabold text-primary-500 text-6xl text-left">Ingredients</div>
      <div className="flex flex-col">
        <div className="flex flex-col divide-y-2 divide-tertiary-500 font-poppins font-extralight text-gray-600">
          {recipeIngredients.map((ingredient, index) => (
            editMode ? (
              <div key={index} className="flex items-center py-4">
                <input
                  className="resize-none overflow-hidden placeholder:text-wrap w-full p-2.5 focus:outline-none text-md rounded-xl border border-blue-200 "
                  value={ingredient}
                  onChange={(e) => {
                    const updatedIngredients = [...recipeIngredients];
                    updatedIngredients[index] = e.target.value;
                    setRecipeIngredients(updatedIngredients);
                  }}
                  placeholder="Enter your ingredient..."
                />
                <button
                  className="px-2 py-1 rounded text-white"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  <FaTimes className="text-secondary-500" />{" "}
                  {/* Change color to gray */}
                </button>
              </div>
            ) : (
              <div key={index} className="text-left text-md py-2.5">{ingredient}</div>
            )
          ))}
        </div>

        {/* Input for new ingredient */}
        {editMode && (
          <div className="flex justify-center items-center">
            <div className="w-1/2 border border-tertiary-500" />{" "}
            {/* Horizontal divider */}
            <button
              className="px-2 py-1 rounded text-white"
              onClick={handleAddIngredient}
            >
              <FaPlus className="text-secondary-500" /> {/* Change color to gray */}
            </button>
            <div className="w-1/2 border border-tertiary-500" />{" "}
            {/* Horizontal divider */}
          </div>
        )}

      </div>
    </div>
  );
};
