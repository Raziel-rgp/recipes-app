// se persistsir aquele erro do unxpected end Json taca try e catch em todas requisições!
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';

function Recipes({ name }) {
  const [click, setClick] = useState({ name: '' });
  const { push } = useHistory();

  const {
    drinksFilter,
    mealsFilter,
    btnsDrinks,
    btnsMeals,
    clickCategory,
    clearAllFilters,
  } = useContext(RecipesContext);
  const max = 11;

  const renderButtons = (lista, type) => (
    lista.map((e, index) => (
      <button
        data-testid={ `${e.strCategory}-category-filter` }
        type="button"
        key={ index }
        onClick={ (evt) => {
          if (e !== click.name) clickCategory(evt, type);
          if (click.name === e) clearAllFilters(type);
          setClick({ name: e });
        } }
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
              renderButtons(btnsDrinks, 'drink')
            }
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ () => clearAllFilters('drink') }
            >
              All
            </button>
            {
              drinksFilter?.filter((_, index) => index <= max)
                .map((e, index) => (
                  <div
                    key={ e.idDrink }
                    data-testid={ `${index}-recipe-card` }
                    onClick={ () => push(`/drinks/${e.idDrink}`) }
                    aria-hidden="true"
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
              renderButtons(btnsMeals, 'meal')
            }
            <button
              type="button"
              data-testid="All-category-filter"
              name="meal"
              onClick={ clearAllFilters }
            >
              All
            </button>
            {
              mealsFilter?.filter((_, index) => index <= max)
                .map((e, index) => (
                  <div
                    key={ e.idMeal }
                    data-testid={ `${index}-recipe-card` }
                    onClick={ () => push(`/meals/${e.idMeal}`) }
                    aria-hidden="true"
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
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Recipes;
