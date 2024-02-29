import React, { useState } from "react";
import { QuantitySelector } from "../../components/RecipePage/QuantitySelector";
import { Tags } from "../../components/RecipePage/Tags";

export const RecipePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipeYield, setRecipeYield] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [tags, setTags] = useState([]);

  return (
    <>
      <div className="w-screen h-4 bg-gray-300" />
      <div className="flex divide-x justify-center w-screen">
        <div className="flex flex-auto justify-center basis-1/2 flex-col pt-18 p-20 gap-7">
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
            className="block p-2.5 text-md text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Enter your description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2 divide-x">
            {/* recipeYield */}
            <div className="flex items-center gap-2 px-2">
              <img src="../../src/assets/servesIcon.svg" className="size-8" />
              <div className="align-middle text-gray-500">Serves</div>
              <QuantitySelector
                quantity={recipeYield}
                setQuantity={setRecipeYield}
              />
            </div>
            {/* timeTaken */}
            <div className="flex items-center gap-2 px-3">
              <img
                src="../../src/assets/timeTakenIcon.svg"
                className="size-8"
              />
              <QuantitySelector
                quantity={timeTaken}
                setQuantity={setTimeTaken}
              />
              <div className="align-middle text-gray-500">mins</div>
            </div>
          </div>
          {/* Tags */}
          <Tags tags={tags} setTags={setTags} />
        </div>
        <div className=" flex justify-center basis-1/2 p-20 ">
          <div className="bg-gray-300 place-self-center w-full h-full rounded-3xl aspect-square"></div>
        </div>
      </div>
      <div className="w-screen h-4 bg-gray-300" />
      <div className="flex divide-x justify-center p-10 pb-0">
        <div className="flex flex-auto flex-col pt-10 p-20 gap-7">
          <div className="font-extrabold text-5xl text-left">Ingredients</div>
        </div>
        <div className="flex flex-auto flex-col pt-10 p-20 gap-7">
          <div className="font-extrabold text-5xl text-left">Method</div>
        </div>
      </div>
    </>
  );
};
