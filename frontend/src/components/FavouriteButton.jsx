import React, { useState } from 'react';

const FavouriteButton = ({ favouritedByOwner }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteCount, setFavouriteCount] = useState(0);

  const handleToggleFavourite = () => {
    setIsFavourite(prevIsFavourite => {
      const newIsFavourite = !prevIsFavourite;
      setFavouriteCount(prevCount => {
        if (newIsFavourite) {
          return prevCount + 1;
        } else {
          return prevCount > 0 ? prevCount - 1 : 0;
        }
      });
      return newIsFavourite;
    });
  };

  return (
    <div>
      <button onClick={handleToggleFavourite} className="flex items-center">
        <img
          src={isFavourite ? '/favourited.svg' : '/unfavourited.svg'}
          alt={isFavourite ? 'Favourite' : 'Unfavourite'}
          className="h-8 w-8"
        />
        <span className="ml-1">{favouriteCount}</span>
      </button>
    </div>
  );
};

export default FavouriteButton;
