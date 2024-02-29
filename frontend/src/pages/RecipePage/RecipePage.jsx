import React, { useState } from "react";
import { QuantitySelector } from "../../components/RecipePage/QuantitySelector";
import { Tags } from "../../components/RecipePage/Tags";
import { RecipeTitle } from "../../components/RecipePage/RecipeTitle";
import { IngredientList } from "../../components/RecipePage/IngredientList";

export const RecipePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipeYield, setRecipeYield] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [tags, setTags] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([
    "1 cup of sugar",
  ]);

  const [recipeInstructions, setRecipeInstructions] = useState([]);

  return (
    <>
      <div className="h-4 bg-gray-300" />
      <div className="flex divide-x justify-center">
        <div className="flex flex-auto w-1/2 justify-center flex-col pt-18 p-20 gap-7">
          {/* title */}
          <RecipeTitle text={title} setText={setTitle} />
          {/* <input
            type="text"
            className="font-extrabold text-6xl text-left focus:outline-none"
            placeholder="Enter Your Title Here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /> */}
          {/* description */}
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 text-md text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Enter your description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 divide-x">
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
        <div className="flex flex-col gap-10 w-1/2 justify-center p-20 ">
          <div className="bg-gray-300 place-self-center w-full rounded-3xl aspect-square"></div>
          <a className="text-md">Generated from this page</a>
        </div>
      </div>
      <div className="w-screen h-4 bg-gray-300" />
      <div className="flex divide-x justify-center p-10 pb-0">
        <div className="flex w-1/2 flex-col pt-10 p-20 gap-7">
          <div className="font-extrabold text-5xl text-left pb-5">
            Ingredients
          </div>
          {/* Loop over recipeIngredients array */}
          <IngredientList
            recipeIngredients={recipeIngredients}
            setRecipeIngredients={setRecipeIngredients}
          />
        </div>
        <div className="flex w-1/2 flex-col pt-10 p-20 gap-7">
          <div className="font-extrabold text-5xl text-left">Method</div>
        </div>
      </div>
    </>
  );
};
