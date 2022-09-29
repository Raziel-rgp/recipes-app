import React from 'react';
import PropTypes from 'prop-types';

function IngredientsStep({ ingredients }) {
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <label
              htmlFor={ `${index}-ingredient-step` }
              key={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                id={ `${index}-ingredient-step` }
              />
              { ingredient }
            </label>
          ))
        }
      </ul>
    </div>
  );
}

IngredientsStep.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsStep;
