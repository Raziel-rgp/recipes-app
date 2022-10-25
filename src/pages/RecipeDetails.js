import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails({ type, match }) {
  const { findRecipeById } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      const { id } = match.params;
      const recipeData = await findRecipeById(id, type);
      setRecipe(recipeData);
    };
    getRecipe();
  }, [findRecipeById, match.params, type]);

  return (
    <div>
      {
        type === 'drinks' ? (
          <div>
            <img src={ recipe.strDrinkThumb } alt={ recipe.strDrink } />
          </div>
        ) : (
          <div>
            <img src={ recipe.strMealThumb } alt={ recipe.setrMeal } />
          </div>
        )
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeDetails;
