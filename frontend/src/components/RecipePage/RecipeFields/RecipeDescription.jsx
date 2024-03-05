import React, { useState } from "react";
import { AutoHeightTextArea } from "../AutoHeightTextArea";

export const RecipeDescription = ({
  description,
  setDescription,
  editMode,
}) => {
  const [height, setHeight] = useState("auto");
  return (
    <div className="text-left text-md">
      {editMode ? (
        <div className="block  p-2.5  text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          <AutoHeightTextArea
            text={description}
            setText={setDescription}
            rows={"4"}
            placeholder={"Enter your description..."}
            height={height}
            setHeight={setHeight}
          />
        </div>
      ) : (
        description
      )}
    </div>
  );
};
