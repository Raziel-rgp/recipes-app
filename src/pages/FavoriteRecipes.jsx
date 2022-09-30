import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import FiltersFoods from '../components/FiltersFoods';
import FoodsContext from '../provider/FoodsContext';
import ShareBtn from '../components/ShareBtn';

function FavoriteRecipes() {
  const {
    filteredFavoriteRecipes,
    favoriteRecipes,
    getFavoriteRecipes,
    setFavoriteRecipes,
  } = useContext(FoodsContext);
  useEffect(() => {
    getFavoriteRecipes();
  }, []);
  const handleClick = (id) => {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipe = favoriteRecipesStorage.filter(
      (favoriteRecipe) => favoriteRecipe.id !== id,
    );
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipe));
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };
  const history = useHistory();
  return (
    <div>
      <section>
        <Header title="Favorite Recipes" />
      </section>
      <FiltersFoods filterFunction={ filteredFavoriteRecipes } />
      { favoriteRecipes.map((recipe, index) => (
        <div key={ index }>
          <button
            type="button"
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          >
            <img
              key={ index }
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              width="250"
              height="300"
            />
          </button>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <button
            type="button"
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          >
            <p data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </p>
          </button>
          <ShareBtn type={ recipe.type } id={ recipe.id } index={ index } />
          <button
            type="button"
            onClick={ () => handleClick(recipe.id) }
          >
            <img
              src={ BlackHeartIcon }
              alt="Black Heart"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
