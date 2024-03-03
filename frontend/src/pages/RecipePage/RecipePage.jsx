import React, { useState } from "react";
import { QuantitySelector } from "../../components/RecipePage/QuantitySelector";
import { Tags } from "../../components/RecipePage/RecipeFields/Tags";
import { IngredientList } from "../../components/RecipePage/RecipeFields/IngredientList";
import { InstructionList } from "../../components/RecipePage/RecipeFields/InstructionList";
import { RecipeName } from "../../components/RecipePage/RecipeFields/RecipeName";
import { RecipeDescription } from "../../components/RecipePage/RecipeFields/RecipeDescription";
import { RecipeYield } from "../../components/RecipePage/RecipeFields/RecipeYield";
import { RecipeTimeTaken } from "../../components/RecipePage/RecipeFields/RecipeTimeTaken";
import { RecipeImage } from "../../components/RecipePage/RecipeFields/RecipeImage";
import { RecipeUrl } from "../../components/RecipePage/RecipeFields/RecipeUrl";
import { SaveButton } from "../../components/RecipePage/SaveButton";
import { EditButton } from "../../components/RecipePage/EditButton";

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

  const handleSaveRecipe = () => {
    if (name === "" || recipeYield === 0 || timeTaken === 0 || recipeIngredients.some(ingredient => ingredient === "") || recipeInstructions.some(instruction => instruction === "")) {
      alert("Please fill out all the required fields");
    } else {
      setEditMode(!editMode);
    }
  }
  

  return (
    <>
      <div className="h-4 bg-gray-300" />
      <div className="flex divide-x justify-center">
        <div className="flex flex-auto w-1/2 justify-center flex-col pt-18 p-20 gap-7">
          {/* title */}
          <RecipeName name={name} setName={setName} editMode={editMode} />
          {/* description */}
          <RecipeDescription
            description={description}
            setDescription={setDescription}
            editMode={editMode}
          />
          <div className="flex flex-wrap gap-2 divide-x">
            {/* recipeYield */}
            <RecipeYield
              recipeYield={recipeYield}
              setRecipeYield={setRecipeYield}
              editMode={editMode}
            />
            {/* timeTaken */}
            <RecipeTimeTaken
              timeTaken={timeTaken}
              setTimeTaken={setTimeTaken}
              editMode={editMode}
            />
          </div>
          {/* Tags */}
          <Tags tags={tags} setTags={setTags} editMode={editMode} />
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
          editMode={editMode}
        />
        <InstructionList
          recipeInstructions={recipeInstructions}
          setRecipeInstructions={setRecipeInstructions}
          editMode={editMode}
        />
      </div>

      {editMode ? (
        <SaveButton handleSaveRecipe={handleSaveRecipe}/>
      ) : (
        <EditButton editMode={editMode} setEditMode={setEditMode} />
      )}
    </>
  );
};
