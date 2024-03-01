import React, { useState } from "react";

export const RecipeTitle = ({ text, setText }) => {
  const [height, setHeight] = useState("auto");

  const handleTextAreaHeightChange = (event) => {
    const textareaLineHeight = 24; // Change this value based on your textarea's line-height
    const { value, style } = event.target;
    setText(value);
    style.height = "auto"; // Reset the height to auto to properly calculate the scrollHeight
    style.height = `${Math.max(
      textareaLineHeight,
      event.target.scrollHeight
    )}px`;
    setHeight(style.height);
  };

  return (
    <textarea
      className="resize-none overflow-hidden placeholder:text-wrap w-full p-2 focus:outline-none text-6xl font-extrabold"
      value={text}
      rows="1"
      onChange={handleTextAreaHeightChange}
      style={{ height: height }}
      placeholder="Enter your title..."
    />
  );
};
