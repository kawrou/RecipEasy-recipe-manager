import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AutoHeightTextArea } from "../AutoHeightTextArea";

export const Instruction = ({
  index,
  instruction,
  setInstruction,
  removeInstruction,
  editMode,
}) => {
  const [height, setHeight] = useState("auto");

  return (
    <div className="divide-y-2 divide-tertiary-500" key={index}>
      <div className="font-kanit font-extrabold text-primary-500 text-2xl text-left pb-3">
        Step {index + 1}
      </div>
      {editMode ? (
        <div className="flex items-center py-4">
          <div className="w-full p-2.5 focus:outline-none text-md text-gray-600 rounded-xl border border-blue-200">
            <AutoHeightTextArea
              text={instruction}
              setText={setInstruction}
              rows={1}
              placeholder="Enter your Instruction..."
              height={height}
              setHeight={setHeight}
            />
          </div>
          <button
            className="transform px-2 py-1 rounded text-white"
            onClick={() => removeInstruction(index)}
          >
            <FaTimes className="text-secondary-500" />{" "}
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
