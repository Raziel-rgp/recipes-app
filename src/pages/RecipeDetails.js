import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import '../styles/RecipeDetails.css';

const MAX_NUM = 6;

function RecipeDetails({ type, match }) {
  const { findRecipeById, drinks, meals, doneRecipes } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { id } = match.params;

  useEffect(() => {
    const getRecipe = async () => {
      const recipeData = await findRecipeById(id, type);
      setRecipe(recipeData);

      const getIngredients = (data) => {
        const keysDataIngredients = Object.keys(data)
          .filter((e) => e.includes('strIngredient'));
        const filterIngredients = keysDataIngredients.filter((e) => recipe[e] !== null);
        const filterVazios = filterIngredients.filter((e) => recipe[e] !== '');
        setIngredients(filterVazios);

        const keysDataMeasure = Object.keys(data)
          .filter((e) => e.includes('strMeasure'));
        const filterMeasures = keysDataMeasure.filter((e) => recipe[e] !== null);
        const measuresVazios = filterMeasures.filter((e) => recipe[e] !== '');
        setMeasures(measuresVazios);
      };
      getIngredients(recipeData);
      console.log('oi');
    };
    getRecipe();
  }, [findRecipeById, type, id]);

  return (
    Object.keys(recipe).length > 0 && (
      <div>
        {
          type === 'drinks' ? (
            <div>
              <img
                className="img_principal"
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid="recipe-photo"
              />
              <h4 data-testid="recipe-title">{recipe.strDrink}</h4>
              <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
              <ul>
                {
                  ingredients.map((e, index) => (
                    <li
                      key={ `${e.idDrink} - ${index}` }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${recipe[e]} - ${recipe[measures[index]]} `}
                    </li>
                  ))
                }
              </ul>
              <p data-testid="instructions">{recipe.strInstructions}</p>
              <div className="recomendation_container">
                {
                  meals.filter((_e, index) => index < MAX_NUM)
                    .map((e, index) => (
                      <div
                        className="recomendation_card"
                        key={ e.idMeal }
                        data-testid={ `${index}-recommendation-card` }
                      >
                        <img src={ e.strMealThumb } alt={ e.srtMeal } />
                        <p data-testid={ `${index}-recommendation-title` }>{e.strMeal}</p>
                      </div>
                    ))
                }
              </div>
            </div>
          ) : (
            <div>
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid="recipe-photo"
                className="img_principal"
              />
              <h4 data-testid="recipe-title">{recipe.strMeal}</h4>
              <p data-testid="recipe-category">{recipe.strCategory}</p>
              <ul>
                {
                  ingredients.map((e, index) => (
                    <li
                      key={ `${e.idMeal} - ${index}` }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${recipe[e]} - ${recipe[measures[index]]} `}
                    </li>
                  ))
                }
              </ul>
              <p data-testid="instructions">{recipe.strInstructions}</p>
              <iframe
                width={ 400 }
                height={ 400 }
                src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                title={ ` Receita ${recipe.strMeal}` }
                frameBorder="0"
                allowFullScreen
                data-testid="video"
                style={ { display: 'block', margin: 'auto' } }
              />
              <div className="recomendation_container">
                {
                  drinks.filter((_e, index) => index < MAX_NUM)
                    .map((e, index) => (
                      <div
                        className="recomendation_card"
                        key={ e.idDrink }
                        data-testid={ `${index}-recommendation-card` }
                      >
                        <img src={ e.strDrinkThumb } alt={ e.strDrink } />
                        <p
                          data-testid={ `${index}-recommendation-title` }
                        >
                          {e.strDrink}
                        </p>
                      </div>
                    ))
                }
              </div>
            </div>
          )
        }

        {
          !doneRecipes.some((e) => e.id === id) && (
            <button
              type="button"
              // onClick={}
              className="start-recipe-button"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
          )
        }

      </div>
    )
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
