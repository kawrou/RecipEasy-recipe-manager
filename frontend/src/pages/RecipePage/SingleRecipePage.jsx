import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { updateRecipe, getRecipeById } from "../../services/recipes";

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

export const SingleRecipePage = ({ token, setToken }) => {
  const navigate = useNavigate();

  const { recipe_id } = useParams();

  const [editMode, setEditMode] = useState(false);

  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [yieldAmount, setYieldAmount] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [recipeUrl, setRecipeUrl] = useState("");
  const [recipeTags, setRecipeTags] = useState([]);

  useEffect(() => {
    if (token) {
      getRecipeById(recipe_id, token)
        .then((data) => {
          setRecipeName(data.recipeData.name);
          setRecipeDescription(data.recipeData.description);
          setYieldAmount(data.recipeData.recipeYield);
          setTotalTime(data.recipeData.totalTime);
          setIngredients(data.recipeData.recipeIngredient);
          setInstructions(data.recipeData.recipeInstructions);
          setImageUrl(data.recipeData.image);
          setRecipeUrl(data.recipeData.url);
          setRecipeTags(data.recipeData.tags);

          setToken(data.token);

          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      navigate("/");
    }
  }, [token]);

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
      let data = await updateRecipe(
        token,
        recipe_id,
        recipeName,
        recipeDescription,
        recipeTags,
        totalTime,
        yieldAmount,
        ingredients,
        instructions,
        recipeUrl,
        imageUrl
      );
      setToken(data.token);
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
