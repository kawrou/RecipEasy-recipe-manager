import { useState } from 'react';

const FavouriteButton = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteCount, setFavouriteCount] = useState(0);

  const handleToggleFavourite = () => {
    setIsFavourite(prevIsFavourite => {
      const newIsFavourite = !prevIsFavourite;
      setFavouriteCount(prevCount => newIsFavourite ? prevCount + 1 : prevCount - 1);
      return newIsFavourite;
    });
  };
  
  
  return (
    <div>
      <button onClick={handleToggleFavourite} className="flex items-center">
        <svg
          className={`h-8 w-8 ${isFavourite ? 'text-red-500' : 'text-gray-500'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" className="stroke-current stroke-2" />
          {isFavourite ? (
            <path
              fill="currentColor"
              d="M12 18l-1.45-1.32C5.55 11.36 3 8.35 3 5.5 3 3.42 4.42 2 6.5 2c1.54 0 3.04.99 4 2.5C11.46 2.99 12.96 2 14.5 2 16.58 2 18 3.42 18 5.5c0 2.85-2.55 5.86-8.55 11.18L12 18z"
            />
          ) : (
            <path
              fill="none"
              d="M12 18l-1.45-1.32C5.55 11.36 3 8.35 3 5.5 3 3.42 4.42 2 6.5 2c1.54 0 3.04.99 4 2.5.96-1.51 2.46-2.5 4-2.5 2.08 0 3.5 1.42 3.5 3.5 0 2.85-2.55 5.86-8.55 11.18L12 18z"
            />
          )}
        </svg>
        <span className="ml-1">{favouriteCount}</span>
      </button>
    </div>
  );
};

export default FavouriteButton;
