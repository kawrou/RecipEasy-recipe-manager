import React, { useState } from "react";
import { QuantitySelector } from "../../components/RecipePage/QuantitySelector";
import { Tags } from "../../components/RecipePage/Tags";
import { IngredientList } from "../../components/RecipePage/IngredientList";
import { InstructionList } from "../../components/RecipePage/InstructionList";
import { FaEdit, FaSave } from "react-icons/fa";
import { RecipeName } from "../../components/RecipePage/RecipeName";
import { RecipeDescription } from "../../components/RecipePage/RecipeDescription";
import { RecipeYield } from "../../components/RecipePage/RecipeYield";
import { RecipeTimeTaken } from "../../components/RecipePage/RecipeTimeTaken";
import { RecipeImage } from "../../components/RecipePage/RecipeImage";
import { RecipeUrl } from "../../components/RecipePage/RecipeUrl";

export const RecipePage = (newRecipe) => {
  const [editMode, setEditMode] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recipeYield, setRecipeYield] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [tags, setTags] = useState([]);

  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");

  const [recipeIngredients, setRecipeIngredients] = useState([""]);
  const [recipeInstructions, setRecipeInstructions] = useState([""]);

  return (
    <>
      <div className="h-4 bg-gray-300" />
      <div className="flex divide-x justify-center">
        <div className="flex flex-auto w-1/2 justify-center flex-col pt-18 p-20 gap-7">
          {/* title */}
          <RecipeName name={name} setName={setName} />
          {/* description */}
          <RecipeDescription
            description={description}
            setDescription={setDescription}
          />
          <div className="flex flex-wrap gap-2 divide-x">
            {/* recipeYield */}
            <RecipeYield
              recipeYield={recipeYield}
              setRecipeYield={setRecipeYield}
            />
            {/* timeTaken */}
            <RecipeTimeTaken
              timeTaken={timeTaken}
              setTimeTaken={setTimeTaken}
            />
          </div>
          {/* Tags */}
          <Tags tags={tags} setTags={setTags} />
        </div>
        <div className="flex flex-col gap-10 w-1/2 justify-center p-20 ">
          <RecipeImage />
          <RecipeUrl />
        </div>
      </div>
      <div className="w-screen h-4 bg-gray-300" />
      <div className="flex divide-x justify-center p-10 pb-0">
        {/* Loop over recipeIngredients array */}
        <IngredientList
          recipeIngredients={recipeIngredients}
          setRecipeIngredients={setRecipeIngredients}
        />
        <InstructionList
          recipeInstructions={recipeInstructions}
          setRecipeInstructions={setRecipeInstructions}
        />
      </div>

      <button
        className={`fixed bottom-10 right-10 ${
          editMode
            ? "bg-blue-500 hover:bg-blue-700 text-white"
            : "bg-white border border-gray-900"
        } font-bold h-10 px-4 rounded-lg flex items-center`}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? (
          <>
            <FaSave className="mr-2" />
            Save
          </>
        ) : (
          <>
            <FaEdit className="mr-2" />
            Edit
          </>
        )}
      </button>
    </>
  );
};
