import React, { useState, useEffect } from "react";
import timeTakenIcon from "../../assets/timeTakenIcon.svg";
import { getRecipeById } from "../../services/recipes";
import { Link } from "react-router-dom";
import { FavouriteButton } from "../../components/RecipePage/FavouriteButton";

const RecipeCard = ({ recipe, token, setToken }) => {
  const placeholderImage = "https://via.placeholder.com/300";
  const defaultName = "Recipe Name";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const data = await getRecipeById(recipe._id, token);
        setRecipeData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
      return token
    };

    if (recipe._id) {
      fetchData();
    }
  }, [recipe._id]);

  return (
    <Link
      to={`/recipes/${recipe._id}`}
      className="flex flex-none justify-center items-center h-full"
    >
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {recipeData && (
        <div className="w-full p-4">
          <div className="bg-white rounded-3xl overflow-hidden flex flex-col gap-4 items-center shadow-md p-5">
            <div className="w-full ">
              <div
                className="bg-cover bg-center h-48 rounded-2xl"
                style={{ backgroundImage: `url(${recipe.image})` }}
              ></div>
            </div>
            <div className="w-full text-left">
              <h2 className="font-kanit text-2xl font-bold text-primary-500 mb-3">
                {recipe.name || defaultName}
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center font-kanit font-bold gap-0.5 text-secondary-500">
                  <img
                    className="size-8 mr-2"
                    src={timeTakenIcon}
                    alt="Timer Image"
                  />
                  <p>{recipe.totalTime}</p>
                  <p> mins</p>
                </div>

                <FavouriteButton
                  recipeId={recipe._id}
                  token={token}
                  size={30}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default RecipeCard;
