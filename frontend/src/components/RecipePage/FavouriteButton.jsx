import React, { useEffect, useState } from 'react';
import { toggleFavourite } from '../../services/recipes';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const FavouriteButton = ({ recipeId, token, size }) => {
  const [favStatus, setFavStatus] = useState(false);
  console.log('initialFavStatus', favStatus)

  useEffect(() =>{
    const storedFavStatus = localStorage.getItem(`favouritedByOwner_${recipeId}`);
    if (storedFavStatus) {
      setFavStatus(JSON.parse(storedFavStatus));
    }
  }, [recipeId]);


  const handleFavouriteButton = async () => {
    try {
      // Call the toggleFavourite function to toggle the favourite status
      await toggleFavourite(recipeId, token);
      console.log('Toggle favourite successful');
      // Update the local state to reflect if favourited
      setFavStatus(prevStatus => !prevStatus);
      localStorage.setItem(`favouritedByOwner_${recipeId}`, JSON.stringify(!favStatus))
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
          className="h-10 w-10"
        />
      </button>
    </div>
  );
};
