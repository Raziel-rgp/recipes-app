import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import fetchApi from '../services/fetchApi';
import '../styles/RecipesDetails.css';
import RecipeDetailsCarousel from '../components/RecipeDetailsCarousel';
import RecipeDetailsShareBtn from '../components/RecipeDetailsShareBtn';
import RecipeDetailsVideo from '../components/RecipeDetailsVideo';

const copyLinkShare = (callback, history) => {
  const timeLimit = 2000;
  callback(true);
  copy(`http://localhost:3000${history.location.pathname}`);
  setTimeout(() => {
    callback(false);
  }, timeLimit);
};

function RecipeDetails({ site, siteKey, typeKeysObj, carouselKey, carouselObjKeys }) {
  const [recipeDetails, setRecipeDetails] = useState();
  const [recommendation, setRecommendation] = useState({ [carouselKey]: [] });
  const [ingredientsValues, setIngredientsValues] = useState([]);
  const [linkCopiedMessage, setLinkCopied] = useState(false);
  const history = useHistory();

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: {}, meals: {} };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
    || [{ id: '' }];

  const { id } = useParams();
  useEffect(() => {
    const url = (`https://www.${site}.com/api/json/v1/1/lookup.php?i=${id}`);
    fetchApi(url).then((result) => setRecipeDetails(result[siteKey][0]));

    if (siteKey === 'meals') {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => setRecommendation(response));
    } else if (siteKey === 'drinks') {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => setRecommendation(response));
    }
  }, []);

  useEffect(() => {
    if (recipeDetails) {
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

  const handleClick = () => {
    history.push(`${id}/in-progress`);
  };

  return (
    recipeDetails !== undefined
    && (
      <div>
        {
          linkCopiedMessage
            ? (
              <h4
                style={ { position: 'fixed', zIndex: '15' } }
              >
                Link copied!
              </h4>)
            : null
        }
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
        {
          recommendation !== undefined
            && (
              <div>
                <h3>Recomendations</h3>
                <div
                  className="recommendation-carousel"
                >
                  <RecipeDetailsCarousel
                    recommendation={ recommendation }
                    carouselKey={ carouselKey }
                    carouselObjKeys={ carouselObjKeys }
                  />
                </div>
              </div>
            )
        }
        {
          doneRecipes.every((recipe) => recipe.id !== id)
          && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ { position: 'fixed', bottom: '0px', zIndex: '20' } }
              onClick={ handleClick }
            >
              {
                Object.keys(inProgressRecipes[siteKey]).some((key) => key === id)
                  ? 'Continue Recipe'
                  : 'Start Recipe'
              }
            </button>
          )
        }
        <RecipeDetailsShareBtn
          copyLinkShare={ () => copyLinkShare(setLinkCopied, history) }
        />
        <button
          type="button"
          data-testid="favorite-btn"
          style={
            { bottom: '0px', zIndex: '11', margin: '20px 20px 40px', padding: '6px' }
          }
        >
          Favorite Recipe
        </button>
        <RecipeDetailsVideo siteKey={ siteKey } src={ recipeDetails.strYoutube } />
      </div>
    )
  );
}

RecipeDetails.propTypes = {
  site: PropTypes.string.isRequired,
  siteKey: PropTypes.string.isRequired,
  carouselKey: PropTypes.string.isRequired,
  typeKeysObj: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  carouselObjKeys: PropTypes.shape(PropTypes.string.isRequired).isRequired,
};

export default RecipeDetails;
