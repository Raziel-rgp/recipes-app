import React, { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FoodsContext from '../provider/FoodsContext';
import RecipeInProgressCard from '../components/RecipeInProgressCard';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { getRecipeInProgress, inProgressRecipe } = useContext(FoodsContext);

  let site = 'thecocktaildb';
  let typeFood = 'drinks';
  if (pathname.includes('meals')) {
    site = 'themealdb';
    typeFood = 'meals';
  }

  useEffect(() => {
    getRecipeInProgress(site, id);
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const inProgressRecipes = {
        drinks: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }, []);

  const getIngredients = (food) => {
    const ingredients = [];
    const lastIngredient = 20;
    for (let i = 1; i <= lastIngredient; i += 1) {
      if (food[`strIngredient${i}`]) {
        // ingredients.push(`${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`);
        ingredients.push(`${food[`strIngredient${i}`]}`);
      }
    }
    return ingredients;
  };

  const renderCard = () => {
    const food = inProgressRecipe[typeFood][0];
    const { strCategory, strInstructions, strAlcoholic, strArea, strTags } = food;
    if (typeFood === 'meals') {
      const { strMealThumb, strMeal, idMeal } = food;
      return (
        <RecipeInProgressCard
          image={ strMealThumb }
          name={ strMeal }
          id={ idMeal }
          type={ typeFood }
          tags={ strTags }
          alcoholicOrNot={ strAlcoholic }
          nationality={ strArea }
          category={ strCategory }
          ingredients={ getIngredients(food) }
          instructions={ strInstructions }
        />
      );
    }
    const { strDrinkThumb, strDrink, idDrink } = food;
    return (
      <RecipeInProgressCard
        image={ strDrinkThumb }
        name={ strDrink }
        id={ idDrink }
        tags={ strTags }
        alcoholicOrNot={ strAlcoholic }
        nationality={ strArea }
        type={ typeFood }
        ingredients={ getIngredients(food) }
        category={ strCategory }
        instructions={ strInstructions }
      />
    );
  };

  return (
    <main>
      {
        inProgressRecipe[typeFood] && renderCard()
      }
    </main>
  );
}

export default RecipeInProgress;
