import React, { useContext, useEffect } from 'react';
import FoodsCards from '../components/FoodsCards';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';

const MAX_LENGTH_FOODS = 12;

function Meals() {
  const { foods, setSite } = useContext(FoodsContext);

  useEffect(() => {
    setSite('themealdb');
  }, [setSite]);

  return (
    <main>
      <Header title="Meals" iconSearch site="themealdb" />
      {
        foods && foods.meals.map(({ idMeal, strMeal, strMealThumb }, index) => {
          if (index < MAX_LENGTH_FOODS) {
            return (<FoodsCards
              key={ idMeal }
              id={ idMeal }
              name={ strMeal }
              img={ strMealThumb }
              index={ index }
            />);
          }
          return undefined;
        })
      }
    </main>
  );
}

export default Meals;
