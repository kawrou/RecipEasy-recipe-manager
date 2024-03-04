import React, { useState } from 'react';

const FavouriteButton = () => {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleToggleFavourite = () => {
    setIsFavourite(prevIsFavourite => !prevIsFavourite);
  };

  return (
    <div>
      <button onClick={handleToggleFavourite} className="flex items-center">
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
