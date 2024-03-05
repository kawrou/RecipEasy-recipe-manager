import React, { useState } from 'react';
import { toggleFavourite } from '../services/recipe';

const FavouriteButton = ({ recipeId, token  }) => {
  const [favStatus, setFavStatus] = useState(false);
  console.log('initialFavStatus', favStatus)


  const handleFavouriteButton = async () => {
    try {
      console.log('button clicked')
      // Call the toggleFavourite function to toggle the favourite status
      await toggleFavourite(recipeId, token);
      console.log('Toggle favourite successful');
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
