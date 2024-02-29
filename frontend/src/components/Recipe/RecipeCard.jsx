const RecipeCard = (props) => {
  return <article key={props.recipe._id}>{props.recipe.message}</article>;
};

export default RecipeCard;
