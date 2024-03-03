import React, { useState } from "react";
import { AutoHeightTextArea } from "./AutoHeightTextArea";

export const RecipeName = ({ name, setName }) => {
  return (
    <div className="text-6xl font-black">
      <AutoHeightTextArea
        text={name}
        setText={setName}
        rows={"1"}
        placeholder={"Enter your title..."}
        lineheight={24}
      />
    </div>
  );
};
