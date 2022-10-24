import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function Recipes({ name }) {
  const { drinks, meals, btnsDrinks, btnsMeals } = useContext(RecipesContext);
  const max = 11;

  const renderButtons = (lista) => (
    lista.map((e, index) => (
      <button
        data-testid={ `${e.strCategory}-category-filter` }
        type="button"
        key={ index }
      >
        {e.strCategory}
      </button>
    ))
  );

  return (
    <div>
      {
        name === 'drinks' ? (
          <div>
            {
              renderButtons(btnsDrinks)
            }
            {
              drinks?.filter((_, index) => index <= max)
                .map((e, index) => (
                  <div
                    key={ e.idDrink }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ e.strDrinkThumb }
                      alt={ e.strDrink }
                    />
                    <h4 data-testid={ `${index}-card-name` }>{e.strDrink}</h4>
                  </div>
                ))
            }
          </div>
        ) : (
          <div>
            {
              renderButtons(btnsMeals)
            }
            {
              meals?.filter((_, index) => index <= max)
                .map((e, index) => (
                  <div
                    key={ e.idMeal }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      src={ e.strMealThumb }
                      alt={ e.strMeal }
                      data-testid={ `${index}-card-img` }
                    />
                    <h4 data-testid={ `${index}-card-name` }>{e.strMeal}</h4>
                  </div>
                ))
            }
          </div>
        )
      }
    </div>
  );
}

Recipes.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Recipes;
