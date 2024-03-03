import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa"; // Import icons from FontAwesome

export const InstructionList = ({
  recipeInstructions,
  setRecipeInstructions,
}) => {
  const [newInstruction, setNewInstruction] = useState("");
  const [heights, setHeights] = useState(
    Array(recipeInstructions.length).fill("auto")
  );

  const handleTextAreaHeightChange = (event, index) => {
    const textareaLineHeight = 24;
    const { value, style } = event.target;
    const updatedInstructions = [...recipeInstructions];
    updatedInstructions[index] = value;
    setRecipeInstructions(updatedInstructions);
    style.height = "auto";
    style.height = `${Math.max(
      textareaLineHeight,
      event.target.scrollHeight
    )}px`;
    const updatedHeights = [...heights];
    updatedHeights[index] = style.height;
    setHeights(updatedHeights);
  };

  const handleAddInstruction = () => {
    if (recipeInstructions.some((instruction) => instruction === "")) {
      alert(
        "Please fill in all previous fields before adding a new Instruction."
      );
      return;
    }
    setRecipeInstructions([...recipeInstructions, newInstruction]);
    setNewInstruction(""); // Clear newInstruction state
    setHeights([...heights, "auto"]); // Add "auto" height for the new textarea
  };

  const handleRemoveInstruction = (index) => {
    const updatedInstructions = [...recipeInstructions];
    updatedInstructions.splice(index, 1);
    setRecipeInstructions(updatedInstructions);
    const updatedHeights = [...heights];
    updatedHeights.splice(index, 1);
    setHeights(updatedHeights);
  };

  return (
    <div className="flex w-1/2 flex-col pt-10 p-20 gap-7">
      <div className="font-extrabold text-5xl text-left">Method</div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          {recipeInstructions.map((instruction, index) => (
            <div className="divide-y-2" key={index}>
              <div className="font-extrabold text-2xl text-left pb-3">
                Step {index + 1}
              </div>
              <div className="relative py-4">
                <textarea
                  className="resize-none overflow-hidden placeholder:text-wrap w-full p-2.5 focus:outline-none text-md text-gray-900 bg-gray-50 rounded-xl border border-gray-300"
                  value={instruction}
                  rows="1"
                  onChange={(e) => handleTextAreaHeightChange(e, index)}
                  style={{ height: heights[index] }}
                  placeholder="Enter your Instruction..."
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-white"
                  onClick={() => handleRemoveInstruction(index)}
                >
                  <FaTimes style={{ color: "gray" }} />{" "}
                </button>
              </div>
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
};
