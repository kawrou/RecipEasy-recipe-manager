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
import { FavouriteButton } from "../../components/RecipePage/FavouriteButton";

export const SingleRecipePage = ({ token, setToken }) => {
  const navigate = useNavigate();

  const { recipe_id } = useParams();

  const [editMode, setEditMode] = useState(false);

  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [yieldAmount, setYieldAmount] = useState(0);
  const [recipeTotalTime, setRecipeTotalTime] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [recipeTags, setRecipeTags] = useState([]);
  const [recipeUrl, setRecipeUrl] = useState("");

  useEffect(() => {
    if (token) {
      getRecipeById(recipe_id, token)
        .then((data) => {
          setRecipeName(data.recipeData.name);
          setRecipeDescription(data.recipeData.description);
          setYieldAmount(data.recipeData.recipeYield);
          setRecipeTotalTime(data.recipeData.totalTime);
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
      recipeTotalTime === 0 ||
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
        recipeTotalTime,
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
    <div className="bg-tertiary-500">
      <div className="flex divide-x-2 divide-tertiary-500 justify-center bg-white shadow-md rounded-3xl m-5 mb-2 py-20">
        <div className="flex justify-center w-1/2 flex-col pt-18 px-20 gap-10">
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
        <div className="flex flex-1 flex-col gap-10 justify-center px-20 ">
          <RecipeImage imageUrl={imageUrl} />
          <RecipeUrl recipeUrl={recipeUrl} />
        </div>
      </div>
      <div className="h-4 bg-tertiary-500" />
      <div className="flex justify-center  pb-0">
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
    </div>
  );
};
