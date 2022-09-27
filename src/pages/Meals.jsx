import React, { useContext, useEffect } from 'react';
import FoodsCards from '../components/FoodsCards';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';
import Footer from '../components/Footer';

const MAX_LENGTH_FOODS = 12;

function Meals() {
  const { foods, setSite, getFoods } = useContext(FoodsContext);

  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    getFoods(url);
    setSite('themealdb');
  }, []);

  useEffect(() => {
    const checkFoods = () => {
      if (foods.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    checkFoods();
  }, [foods]);

  return (
    <main>
      <Header title="Meals" iconSearch />
      {
        foods.meals && foods.meals.length && foods.meals.map(
          (({ idMeal, strMeal, strMealThumb }, index) => {
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
          }),
        )
      }
      <Footer />
    </main>
  );
}

export default Meals;
