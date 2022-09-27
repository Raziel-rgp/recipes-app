import React, { useContext, useEffect } from 'react';
import FoodsCards from '../components/FoodsCards';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';
import Footer from '../components/Footer';
import Categories from '../components/Categories';

const MAX_LENGTH_FOODS = 12;
const MAX_LENGTH_CATEGORIES = 5;

function Meals() {
  const {
    foods, setSite, getFoods, getCategories, categories,
  } = useContext(FoodsContext);

  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const site = 'themealdb';
    getFoods(url);
    setSite(site);
    getCategories(site);
  }, []);

  if (foods.meals === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return (
    <section>
      <Header title="Meals" iconSearch />
      <main className="foods-main-container">
        <div>
          {
            categories && categories.meals
            && categories.meals.map(({ strCategory }, index) => {
              if (index < MAX_LENGTH_CATEGORIES) {
                return (<Categories
                  category={ strCategory }
                  key={ strCategory }
                />);
              }
              return undefined;
            })
          }
        </div>
        <div className="foods-main-div">
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
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default Meals;
