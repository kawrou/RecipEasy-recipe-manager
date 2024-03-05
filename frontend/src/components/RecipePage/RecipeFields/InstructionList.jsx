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
    <div className="flex w-1/2 flex-col pt-10 p-20 gap-7">
      <div className="font-extrabold text-5xl text-left">Method</div>
      <div className="flex flex-col">
        <div className="flex flex-col">
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
            <div className="w-1/2 border border-gray-200" />{" "}
            <button
              className="px-2 py-1 rounded text-white"
              onClick={handleAddInstruction}
            >
              <FaPlus style={{ color: "gray" }} />
            </button>
            <div className="w-1/2 border border-gray-200" />{" "}
          </div>
        )}
      </div>
    </div>
  );
};
