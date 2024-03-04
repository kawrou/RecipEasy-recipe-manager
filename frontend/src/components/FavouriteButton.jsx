import React, { useState, useEffect } from 'react';
import { toggleFavourite } from '../services/getRecipes';

const FavouriteButton = ({ recipeId, token, isFavourite }) => {
  const [favStatus, setFavStatus] = useState(isFavourite);

  useEffect(() => {
    // Check if the recipe is already favourited by the logged-in user
    setFavStatus(isFavourite);
  }, [isFavourite]);

  const handleFavouriteButton = async () => {
    try {
      // Call the toggleFavourite function to toggle the favourite status
      await toggleFavourite(recipeId, token);
      // Update the local state to reflect if favourited
      setFavStatus(prevStatus => !prevStatus);
    } catch(error) {
      console.error('Failed to toggle Favourite button', error);
    }
  };

  return (
    <div>
      <button onClick={handleFavouriteButton} className="flex items-center">
        <img
          src={favStatus ? '/favourited.svg' : '/unfavourited.svg'}
          alt={favStatus ? 'Favourite' : 'Unfavourite'}
          className="h-8 w-8"
        />
      </button>
    </div>
  );
};

export default FavouriteButton;
