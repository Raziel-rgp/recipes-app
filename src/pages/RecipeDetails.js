import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails({ type, match }) {
  const { findRecipeById } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const { id } = match.params;
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
    };
    getRecipe();
  }, [findRecipeById, match.params, recipe, type]);

  return (
    Object.keys(recipe).length > 0 && (
      <div>
        {
          type === 'drinks' ? (
            <div>
              <img
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
            </div>
          ) : (
            <div>
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid="recipe-photo"
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
              />
              {/* <iframe width="1148" height="646" src="https://www.youtube.com/embed/VVnZd8A84z4" title="Turkish Vegetable Lentil Soup Recipe – Traditional Turkish Red Lentil" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            </div>
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
