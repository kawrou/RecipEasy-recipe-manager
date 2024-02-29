const RecipeCard = (props) => {
  return <article key={props.recipe._id}>{props.recipe.title}</article>;
};

export default RecipeCard;
