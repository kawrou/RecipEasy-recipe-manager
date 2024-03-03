import React, { useState } from "react";

export const AutoHeightTextArea = ({ text, setText, rows, placeholder, height, setHeight }) => {
  
  const handleTextAreaHeightChange = (event) => {
    const { value, style } = event.target;
    setText(value);
    style.height = "auto"; // Reset the height to auto to properly calculate the scrollHeight
    style.height = `${Math.max(
      parseFloat(window.getComputedStyle(event.target).fontSize),
      event.target.scrollHeight
    )}px`;
    setHeight(style.height);
  };

  return (
    <textarea
      className="resize-none overflow-hidden placeholder:text-wrap focus:outline-none bg-transparent w-full "
      value={text}
      rows={rows}
      onChange={handleTextAreaHeightChange}
      style={{ height: height }}
      placeholder={placeholder}
    />
  );
};
