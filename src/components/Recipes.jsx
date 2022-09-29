import React from 'react';
import FoodCard from './FoodCard';

function Recipes({ foods, type }) {
  const MAX_LENGTH_FOODS = 12;
  const {
    id,
    str,
    thumb,
  } = type;

  return (
    foods.map(
      (food, index) => {
        if (index < MAX_LENGTH_FOODS) {
          return (
            <FoodCard
              key={ food[id] }
              id={ food[id] }
              name={ food[str] }
              img={ food[thumb] }
              index={ index }
            />
          );
        }
        return undefined;
      },
    )
  );
}

export default Recipes;
