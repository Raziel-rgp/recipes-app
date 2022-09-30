import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientsStep({ id, ingredients, type }) {
  const [checked, setChecked] = useState([]);

  const inProgressRecipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    if (inProgressRecipesStorage[type][id]) {
      setChecked(inProgressRecipesStorage[type][id]);
    } else {
      const auxArray = [];
      for (let i = 0; i < ingredients.length; i += 1) {
        auxArray.push(false);
      }
      const arrayInProgress = {
        ...inProgressRecipesStorage,
        [type]: {
          ...inProgressRecipesStorage[type],
          [id]: auxArray,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(arrayInProgress));
      setChecked(auxArray);
    }
  }, []);

  const handleCheck = (index) => {
    const inProgressRecipes = inProgressRecipesStorage;
    inProgressRecipes[type][id][index] = !inProgressRecipes[type][id][index];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    setChecked(inProgressRecipes[type][id]);
  };

  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {
          checked.length && ingredients.map((ingredient, index) => (
            <label
              htmlFor={ `${index}-ingredient-step` }
              key={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                onChange={ () => handleCheck(index) }
                checked={ checked[index] }
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
  ingredients: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default IngredientsStep;
