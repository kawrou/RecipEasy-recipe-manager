import React from "react";
import { FaTimes } from "react-icons/fa";
import { AutoHeightTextArea } from "../AutoHeightTextArea";

export const Instruction = ({
  index,
  instruction,
  handleTextAreaHeightChange,
  handleRemoveInstruction,
  editMode,
}) => {
  return (
    <div className="divide-y-2" key={index}>
      <div className="font-extrabold text-2xl text-left pb-3">
        Step {index + 1}
      </div>
      {editMode ? (
        <div className="relative py-4">
          <AutoHeightTextArea
            text={instruction}
            setText={(value) => handleTextAreaHeightChange(value, index)}
            placeholder="Enter your Instruction..."
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-white"
            onClick={() => handleRemoveInstruction(index)}
          >
            <FaTimes style={{ color: "gray" }} />{" "}
          </button>
        </div>
      ) : (
        <div key={index} className="text-left text-md py-2.5 pb-5">
          {instruction}
        </div>
      )}
    </div>
  );
};
