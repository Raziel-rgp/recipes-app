import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import FoodsContext from '../provider/FoodsContext';
import RecipeInProgressCard from '../components/RecipeInProgressCard';

function RecipeInProgress() {
  const { id } = useParams();
  const { getRecipeInProgress, inProgressRecipe } = useContext(FoodsContext);

  let site = 'thecocktaildb';
  let typeFood = 'drinks';
  if (window.document.location.href.includes('meals')) {
    site = 'themealdb';
    typeFood = 'meals';
  }

  useEffect(() => {
    getRecipeInProgress(site, id);
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
    const { strCategory, strInstructions } = food;
    if (typeFood === 'meals') {
      const { strMealThumb, strMeal, idMeal } = food;
      return (
        <RecipeInProgressCard
          image={ strMealThumb }
          title={ strMeal }
          id={ idMeal }
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
        title={ strDrink }
        id={ idDrink }
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
