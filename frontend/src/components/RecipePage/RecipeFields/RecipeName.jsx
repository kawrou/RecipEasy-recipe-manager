import React, { useState } from "react";
import { AutoHeightTextArea } from "../AutoHeightTextArea";

export const RecipeName = ({ name, setName, editMode }) => {
  const [height, setHeight] = useState("auto");
  
  return (
    <div className="font-kanit text-6xl font-extrabold text-left text-primary-500 ">
      {editMode ? (
        <AutoHeightTextArea
        text={name}
        setText={setName}
        rows={1}
        placeholder={"Enter your title..."}
        height={height}
        setHeight={setHeight}
      />
      ):(
        name
      )}
    </div>
  );
};
