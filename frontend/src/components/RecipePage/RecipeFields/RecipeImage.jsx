import React, { useState } from "react";

export const RecipeImage = ({ imageUrl, setImageUrl }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle file selection
  const handleUpload = (e) => {
    console.log(selectedImage);
  }

  return (
    <div className="bg-gray-300 place-self-center w-full rounded-3xl aspect-square">
      {imageUrl ? (
        <div
          className="bg-cover bg-center h-full w-full rounded-3xl"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      ) : (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={e => setSelectedImage(e.target.files[0])}
            className="hidden"
            id="imageInput"
          />
          <button onClick={handleUpload}> Upload Image </button>
          <label htmlFor="imageInput" className="cursor-pointer">
            <div className="h-full flex justify-center items-center">
              <span className="text-gray-400">
                Click to upload an image
              </span>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};
