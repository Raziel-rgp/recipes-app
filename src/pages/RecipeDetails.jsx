import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';

function RecipeDetails({ site, siteKey }) {
  const [recipeDetails, setRecipeDetails] = useState();
  const [ingredientsValues, setIngredientsValues] = useState([]);

  const [typeKeys, setTypeKeys] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const url = (`https://www.${site}.com/api/json/v1/1/lookup.php?i=${id}`);
    fetchApi(url)
      .then((result) => {
        console.log(result[siteKey][0]);
        setRecipeDetails(result[siteKey][0]);
      });
    if (siteKey === 'drinks') {
      setTypeKeys({
        thumbKey: 'strDrinkThumb',
        nameKey: 'strDrink',
      });
    } else {
      setTypeKeys({
        thumbKey: 'strMealThumb',
        nameKey: 'strMeal',
      });
    }
  }, []);

  useEffect(() => {
    if (recipeDetails !== undefined) {
      const ingredientsFiltered = Object.entries(recipeDetails)
        .filter((detail) => detail[0].includes('Ingredient')
          && detail[1] !== ''
          && detail[1] !== null);
      const measuresFilter = Object.entries(recipeDetails)
        .filter((detail) => detail[0].includes('Measure')
          && detail[1] !== ' '
          && detail[1] !== null);
      const measuresValues = measuresFilter.map((measure) => measure[1]);
      const ingredientsAndMeasures = [];
      ingredientsFiltered.forEach((ingredient, i) => {
        ingredientsAndMeasures.push(`${measuresValues[i]} ${ingredient[1]}`);
      });
      console.log(ingredientsAndMeasures);
      setIngredientsValues(ingredientsAndMeasures);
    }
  }, [recipeDetails]);

  return (
    recipeDetails !== undefined
    && (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeDetails[typeKeys.thumbKey] }
          alt="Recipe"
          style={ { width: '100%' } }
        />
        <h1
          data-testid="recipe-title"
        >
          { recipeDetails[typeKeys.nameKey] }
        </h1>
        {
          siteKey === 'drinks'
            ? <h4 data-testid="recipe-category">Alcoholic</h4>
            : <h4 data-testid="recipe-category">{ recipeDetails.strCategory }</h4>
        }
        <ul>
          { ingredientsValues.map((ingredient, index) => (
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>
          )) }
        </ul>
        <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
        {
          siteKey === 'meals'
          && (
            <video
              data-testid="video"
              width="360"
              height="200"
              controls
              src={ recipeDetails.strYoutube }
            >
              <track kind="captions" />
            </video>
          )
        }
      </div>
    )
  );
}

RecipeDetails.propTypes = {
  site: PropTypes.string.isRequired,
  siteKey: PropTypes.string.isRequired,
};

export default RecipeDetails;
