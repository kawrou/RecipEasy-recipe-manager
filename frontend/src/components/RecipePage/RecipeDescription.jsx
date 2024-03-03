import React, { useState } from "react";
import { AutoHeightTextArea } from "./AutoHeightTextArea";

export const RecipeDescription = ({ description, setDescription }) => {
  return (
    <div className="block text-left p-2.5 text-md text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
      <AutoHeightTextArea
        text={description}
        setText={setDescription}
        rows={"4"}
        placeholder={"Enter your description..."}
        lineheight={24}
      />
    </div>
  );
};
