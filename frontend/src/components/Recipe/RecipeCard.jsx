import React from 'react';
import timeTakenIcon from '../../assets/timeTakenIcon.svg';
import { getRecipeById } from '../../services/recipe';

const RecipeCard = ({ recipe }) => {
  const placeholderImage = 'https://via.placeholder.com/300';
  const defaultName = 'Recipe Name';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getRecipeById(recipeId);
        setRecipeData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (recipeId) {
      fetchData();
    }
  }, [recipeId]);

  return (
    <div className="flex justify-center items-center h-full">
       {/* ... loading and error states as before ... */}
    {recipeData && (
      <div className="lg:w-1/5 md:w-1/2 w-full p-4">
        <div className="bg-white border rounded-3xl overflow-hidden flex flex-col items-center">
          <div className="w-3/4 mt-4 mb-4 ml-4 mr-4 pb-20 pt-5"> 
            <img
              className="w-full h-48 rounded-3xl"
              src={recipe.image || placeholderImage}
              alt={recipe.name || defaultName}
            />
          </div>
          <div className="w-full p-6 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {recipe.name || defaultName}
            </h2>
            <div className="flex items-center">
              <img
                className="w-6 h-6 mr-2"
                src={timeTakenIcon}
                alt="Timer Image"
              />
              <p className="text-gray-700">{recipe.totalTime}</p>
              <p className="text-gray-700"> mins</p>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default RecipeCard;
