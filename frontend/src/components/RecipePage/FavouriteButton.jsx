import React, { useEffect, useState } from 'react';
import { toggleFavourite } from '../../services/recipes';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

//TODO:
//Check if can get favouritedByOwner passed down as prop
//Check if useEffect can be executed when token is recieved.
//Refactor code to update token once a recipe has been favourited/unfavourited

export const FavouriteButton = ({ recipeId, token, size }) => {
  const [favStatus, setFavStatus] = useState(false);
  // console.log('initialFavStatus', favStatus)

  useEffect(() =>{
    const storedFavStatus = localStorage.getItem(`favouritedByOwner_${recipeId}`);
    if (storedFavStatus) {
      setFavStatus(JSON.parse(storedFavStatus));
    }
  }, [recipeId]);


  //Should think about how to handle errors. Is console.error sufficient?
  //Testing for it also makes the output ugly
  const handleFavouriteButton = async () => {
    try {
      // Call the toggleFavourite function to toggle the favourite status
      await toggleFavourite(recipeId, token);
      // console.log('Toggle favourite successful');
      // Update the local state to reflect if favourited
      setFavStatus(prevStatus => !prevStatus);
      localStorage.setItem(`favouritedByOwner_${recipeId}`, JSON.stringify(!favStatus))
    } catch(error) {
      console.error('Failed to toggle Favourite button', error);
    }
  };

  return (
    <div>
      <button onClick={handleFavouriteButton} aria-label='favourite-button'>
        {favStatus ? <FaHeart className="text-primary-500" size={size} aria-label='heart-icon'/> : <FaRegHeart className="text-primary-500" size={size} aria-label='reg-heart-icon'/>}
      </button>
    </div>
  );
};
