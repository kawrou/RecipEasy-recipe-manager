import React, { useState } from "react";

export const AutoHeightTextArea = ({ text, setText, rows, placeholder, lineheight }) => {
  const [height, setHeight] = useState("auto");

  const handleTextAreaHeightChange = (event) => {
    const textareaLineHeight = lineheight; // Change this value based on your textarea's line-height
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
      className="resize-none overflow-hidden pb-1 placeholder:text-wrap focus:outline-none bg-transparent w-full "
      value={text}
      rows={rows}
      onChange={handleTextAreaHeightChange}
      style={{ height: height }}
      placeholder={placeholder}
    />
  );
};
