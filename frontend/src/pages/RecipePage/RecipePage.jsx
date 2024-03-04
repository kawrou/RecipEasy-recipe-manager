import React, { useState } from "react";
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

export const RecipePage = ({ newRecipe, recipeData }) => {
  
  let recipeDataArray = Array.isArray(recipeData.recipe_data)
    ? recipeData.recipe_data
    : [recipeData.recipe_data];

  const {
    name,
    description,
    recipeYield,
    cookTime,
    prepTime,
    recipeIngredient,
    recipeInstructions,
    image,
    url,
    keywords,
  } = recipeDataArray[0];

  const [editMode, setEditMode] = useState(true);

  let instructionsArray = [];
  if (Array.isArray(recipeInstructions)) {
    instructionsArray = recipeInstructions.map(
      (instruction) => instruction.text
    );
  } else {
    instructionsArray = recipeInstructions || [];
  }

  const [recipeName, setRecipeName] = useState(name || "");
  const [recipeDescription, setRecipeDescription] = useState(description || "");
  const [yieldAmount, setYieldAmount] = useState(recipeYield || "");
  const [totalTime, setTotalTime] = useState(
    calculateTotalTime(cookTime, prepTime) || ""
  );
  const [ingredients, setIngredients] = useState(recipeIngredient || []);
  const [instructions, setInstructions] = useState(instructionsArray);
  const [imageUrl, setImageUrl] = useState(image?.url || image || "");
  const [recipeUrl, setRecipeUrl] = useState(url || "");
  const [recipeTags, setRecipeTags] = useState(parseKeywords(keywords) || []);

  function calculateTotalTime(cookTime, prepTime) {
    // Convert PT20M format to minutes
    const cookTimeInMinutes = cookTime
      ? parseInt(cookTime.substring(2, cookTime.length - 1))
      : 0;
    const prepTimeInMinutes = prepTime
      ? parseInt(prepTime.substring(2, prepTime.length - 1))
      : 0;
    return cookTimeInMinutes + prepTimeInMinutes;
  }

  // Parse keywords string to an array of tags
  function parseKeywords(keywords) {
    return keywords ? keywords.split(",").map((tag) => tag.trim()) : [];
  }

  const handleSaveRecipe = () => {
    if (
      recipeName === "" ||
      yieldAmount === 0 ||
      totalTime === 0 ||
      ingredients.some((ingredient) => ingredient === "") ||
      instructions.some((instruction) => instruction === "")
    ) {
      alert("Please fill out all the required fields");
    } else {
      setEditMode(!editMode);
    }
  };

  return (
    <>
      <div className="h-4 bg-gray-300" />
      <div className="flex divide-x justify-center">
        <div className="flex flex-auto w-1/2 justify-center flex-col pt-18 p-20 gap-7">
          {/* title */}
          <RecipeName
            name={recipeName}
            setName={setRecipeName}
            editMode={editMode}
          />
          {/* description */}
          <RecipeDescription
            description={recipeDescription}
            setDescription={setRecipeDescription}
            editMode={editMode}
          />
          <div className="flex flex-wrap gap-2 divide-x">
            {/* recipeYield */}
            <RecipeYield
              recipeYield={yieldAmount}
              setRecipeYield={setYieldAmount}
              editMode={editMode}
            />
            {/* timeTaken */}
            <RecipeTimeTaken
              timeTaken={totalTime}
              setTimeTaken={setTotalTime}
              editMode={editMode}
            />
          </div>
          {/* Tags */}
          <Tags tags={recipeTags} setTags={setRecipeTags} editMode={editMode} />
        </div>
        <div className="flex flex-col gap-10 w-1/2 justify-center p-20 ">
          <RecipeImage imageUrl={imageUrl} />
          <RecipeUrl recipeUrl={recipeUrl} />
        </div>
      </div>
      <div className="w-screen h-4 bg-gray-300" />
      <div className="flex divide-x justify-center p-10 pb-0">
        {/* Loop over recipeIngredients array */}
        <IngredientList
          recipeIngredients={ingredients}
          setRecipeIngredients={setIngredients}
          editMode={editMode}
        />
        <InstructionList
          recipeInstructions={instructions}
          setRecipeInstructions={setInstructions}
          editMode={editMode}
        />
      </div>

      {editMode ? (
        <SaveButton handleSaveRecipe={handleSaveRecipe} />
      ) : (
        <EditButton editMode={editMode} setEditMode={setEditMode} />
      )}
    </>
  );
};
