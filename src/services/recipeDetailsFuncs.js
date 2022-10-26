export const clickFavorite = ({
  recipe,
  type,
  favoriteRecipes,
  id,
  setFavoriteRecipes,
}) => {
  if (!favoriteRecipes.some((e) => e.id === id)) {
    let favRecipe = {};
    if (type === 'drinks') {
      favRecipe = {
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
    } else {
      favRecipe = {
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    }
    setFavoriteRecipes([...favoriteRecipes, favRecipe]);
  } else {
    setFavoriteRecipes(favoriteRecipes.filter((e) => +e.id !== +id));
  }
};

export const ssdf = () => {};
