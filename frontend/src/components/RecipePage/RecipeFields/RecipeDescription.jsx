import React, { useState } from "react";
import { AutoHeightTextArea } from "../AutoHeightTextArea";

export const RecipeDescription = ({
  description,
  setDescription,
  editMode,
}) => {
  const [height, setHeight] = useState("auto");
  return (
    <div className="font-poppins font-light text-gray-600 text-left text-md">
      {editMode ? (
        <div className="block p-2.5 rounded-xl border border-blue-200 ">
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
