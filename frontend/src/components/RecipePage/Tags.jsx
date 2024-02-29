import React, { useState } from "react";

export const Tags = ({ tags, setTags }) => {
  const [tagsInput, setTagsInput] = useState("");

  const handleTagsInput = (e) => {
    if (e.key === "Enter" && tagsInput.trim() !== "") {
      const newTag = tagsInput.trim().replace(/^#/, "");
      setTags([...tags, newTag]);
      setTagsInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  return (
    <div>
      <label
        htmlFor="tags-input"
        className="block mb-2 text-sm text-left font-medium text-gray-400"
      >
        Tags:
      </label>
      <div className="flex flex-wrap bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex flex-wrap pl-4 pr-2 py-1 m-1 justify-between items-center text-md font-medium rounded-xl cursor-pointer bg-blue-500 text-white hover:bg-blue-600 hover:text-gray-100"
            >
              {tag}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 hover:text-gray-300"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => removeTag(tag)}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ))}
        </div>
        <input
          id="tags-input"
          className="p-2.5 flex-auto bg-transparent text-md text-gray-900 focus:outline-none "
          placeholder="Add tags here..."
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          onKeyDown={handleTagsInput}
        />
      </div>
    </div>
  );
};
