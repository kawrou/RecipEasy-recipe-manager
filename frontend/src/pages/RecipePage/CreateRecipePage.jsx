import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createRecipe } from "../../services/recipes";

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

export const CreateRecipePage = ({ recipeData, token, setToken, url }) => {
  const navigate = useNavigate();

  const {
    name,
    description,
    recipeYield,
    tags,
    totalTime,
    recipeIngredient,
    recipeInstructions,
    image,
  } = recipeData.recipe_data;
  setToken(recipeData.token)

  const [editMode, setEditMode] = useState(true);

  const [recipeName, setRecipeName] = useState(name);
  const [recipeDescription, setRecipeDescription] = useState(description);
  const [yieldAmount, setYieldAmount] = useState(recipeYield);
  const [recipeTotalTime, setRecipeTotalTime] = useState(totalTime);
  const [ingredients, setIngredients] = useState(recipeIngredient);
  const [instructions, setInstructions] = useState(recipeInstructions);
  const [imageUrl, setImageUrl] = useState(image);
  const [recipeTags, setRecipeTags] = useState(tags);

  const handleSaveRecipe = async () => {
    if (
      recipeName === "" ||
      yieldAmount === 0 ||
      totalTime === 0 ||
      ingredients.some((ingredient) => ingredient === "") ||
      instructions.some((instruction) => instruction === "")
    ) {
      alert("Please fill out all the required fields");
    } else {
      let data = await createRecipe(
        token,
        recipeName,
        recipeDescription,
        recipeTags,
        totalTime,
        yieldAmount,
        ingredients,
        instructions,
        url,
        imageUrl
      );
      setToken(data.token);
      navigate(`/recipes/${data.recipe._id}`);
    }
  };

  return (
    <>
      <div className="h-4 bg-tertiary-500" />
      <div className="flex divide-x justify-center">
        <div className="flex justify-center w-1/2 flex-col pt-18 p-20 gap-7">
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
              timeTaken={recipeTotalTime}
              setTimeTaken={setRecipeTotalTime}
              editMode={editMode}
            />
          </div>
          {/* Tags */}
          <Tags tags={recipeTags} setTags={setRecipeTags} editMode={editMode} />
        </div>
        <div className="flex flex-1 flex-col gap-10 justify-center p-20 ">
          <RecipeImage imageUrl={imageUrl} />
          <RecipeUrl recipeUrl={url} />
        </div>
      </div>
      <div className="w-screen h-4 bg-tertiary-500" />
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
