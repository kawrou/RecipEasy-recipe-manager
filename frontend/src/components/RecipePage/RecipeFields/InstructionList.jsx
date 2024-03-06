import React from "react";
import { FaPlus } from "react-icons/fa";
import { Instruction } from "./Instruction";

export const InstructionList = ({
  recipeInstructions,
  setRecipeInstructions,
  editMode,
}) => {
  const handleAddInstruction = () => {
    if (recipeInstructions.some((instruction) => instruction === "")) {
      alert(
        "Please fill in all previous fields before adding a new Instruction."
      );
      return;
    }
    setRecipeInstructions([...recipeInstructions, ""]);
  };

  const handleRemoveInstruction = (index) => {
    const updatedInstructions = [...recipeInstructions];
    updatedInstructions.splice(index, 1);
    setRecipeInstructions(updatedInstructions);
  };

  const setInstruction = (index, value) => {
    const updatedInstructions = [...recipeInstructions];
    updatedInstructions[index] = value;
    setRecipeInstructions(updatedInstructions);
  };

  return (
    <div className="flex w-1/2 flex-col pt-16 p-20 gap-7 rounded-3xl bg-white mr-5 ml-2.5 mb-20 h-fit">
      <div className="font-kanit font-extrabold text-primary-500 text-6xl text-left">Method</div>
      <div className="flex flex-col">
        <div className="flex flex-col font-poppins font-extralight text-gray-600">
          {recipeInstructions.map((instruction, index) => (
            <Instruction
              key={index}
              index={index}
              instruction={instruction}
              setInstruction={(value) => setInstruction(index, value)}
              removeInstruction={handleRemoveInstruction}
              editMode={editMode}
            />
          ))}
        </div>

        {editMode && (
          <div className="flex justify-center items-center">
            <div className="w-1/2 border border-tertiary-500" />{" "}
            <button
              className="px-2 py-1 rounded text-white"
              onClick={handleAddInstruction}
            >
              <FaPlus className="text-secondary-500" />
            </button>
            <div className="w-1/2 border border-tertiary-500" />{" "}
          </div>
        )}
      </div>
    </div>
  );
};
