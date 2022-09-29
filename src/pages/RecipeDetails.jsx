import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';

function RecipeDetails({ site, siteKey, typeKeysObj }) {
  const [recipeDetails, setRecipeDetails] = useState();
  const [recomends, setRecomends] = useState([]);
  const [ingredientsValues, setIngredientsValues] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const url = (`https://www.${site}.com/api/json/v1/1/lookup.php?i=${id}`);
    fetchApi(url).then((result) => setRecipeDetails(result[siteKey][0]));

    if (siteKey === 'meals') {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => setRecomends(response[siteKey]));
    } else if (siteKey === 'drinks') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => setRecomends(response[siteKey]));
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
      setIngredientsValues(ingredientsAndMeasures);
    }
  }, [recipeDetails]);

  useEffect(() => {

  }, [recomends]);

  return (
    recipeDetails !== undefined
    && (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeDetails[typeKeysObj.img] }
          alt="Recipe"
          style={ { width: '100%' } }
        />
        <h1
          data-testid="recipe-title"
        >
          { recipeDetails[typeKeysObj.name] }
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
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
        >
          Start Recipe
        </button>
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
  typeKeysObj: PropTypes.shape(PropTypes.string.isRequired).isRequired,
};

export default RecipeDetails;
