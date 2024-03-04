import React, { useState } from 'react';
import { toggleFavourite } from '../services/getRecipes';

const FavouriteButton = ({recipeId, token}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavouriteButton = async () => {
    try {
      await toggleFavourite(recipeId, token); // Calls function to toggle favourite button
      setIsFavourite(prevIsFavourite => !prevIsFavourite); // Update local state to reflect this
    } catch(error) {
      console.error('Failed to toggle Favourite button', error)
    }
  };

  return (
    <div>
      <button onClick={handleFavouriteButton} className="flex items-center">
        <img
          src={isFavourite ? '/favourited.svg' : '/unfavourited.svg'}
          alt={isFavourite ? 'Favourite' : 'Unfavourite'}
          className="h-8 w-8"
        />
      </button>
    </div>
  );
};

export default FavouriteButton;
