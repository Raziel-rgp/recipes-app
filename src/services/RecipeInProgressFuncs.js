const clickFavorite = (obj) => {
  const { favoriteRecipes, setFavoriteRecipes, data, type, id } = obj;
  if (!favoriteRecipes.some((e) => e.id === id)) {
    let favRecipe = {};
    if (type === 'drinks') {
      favRecipe = {
        id: data.idDrink,
        type: 'drink',
        nationality: '',
        category: data.strCategory,
        alcoholicOrNot: data.strAlcoholic,
        name: data.strDrink,
        image: data.strDrinkThumb,
      };
    } else {
      favRecipe = {
        id: data.idMeal,
        type: 'meal',
        nationality: data.strArea,
        category: data.strCategory,
        alcoholicOrNot: '',
        name: data.strMeal,
        image: data.strMealThumb,
      };
    }
    setFavoriteRecipes([...favoriteRecipes, favRecipe]);
  } else {
    setFavoriteRecipes(favoriteRecipes.filter((e) => +e.id !== +id));
  }
};

export default clickFavorite;
