const RecipeCard = ({recipe}) => {
  return <article key={recipe._id}>{`${recipe.title}, ${recipe.duration} mins`} </article>;
};

export default RecipeCard;
