import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuantitySelector } from "../../components/QuantitySelector";

export const RecipePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipeYield, setRecipeYield] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [tags, setTags] = useState("");

  return (
    <>
      <div className="w-screen h-4 bg-gray-300" />
      <div className="flex divide-x justify-center w-screen">
        <div className="flex flex-1 flex-col p-20 gap-7">
          {/* title */}
          <input
            type="text"
            className="font-extrabold text-6xl text-left focus:outline-none"
            placeholder="Enter Your Title Here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* description */}
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Enter your description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2 divide-x">
            {/* recipeYield */}
            <div className="flex items-center gap-2 px-2">
              <img src="../../src/assets/servesIcon.svg" className="size-8" />
              <div className="align-middle text-gray-500">Serves</div>
              <QuantitySelector />
            </div>
            {/* timeTaken */}
            <div className="flex items-center gap-2 px-3">
              <img
                src="../../src/assets/timeTakenIcon.svg"
                className="size-8"
              />
              <QuantitySelector />
              <div className="align-middle text-gray-500">mins</div>
            </div>
          </div>
          {/* Tags */}
          <div>
            <label
              for="tags-input"
              className="block mb-2 text-sm text-left font-medium text-gray-500"
            >
              Tags:
            </label>
            <input
              id="tags-input"
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className=" flex justify-center align-middle flex-1 p-20">
          <div className="bg-gray-300 w-96 h-80 rounded-xl"></div>
        </div>
      </div>
    </>
  );
};
