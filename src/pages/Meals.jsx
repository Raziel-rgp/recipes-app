import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import Recipes from '../components/Recipes';

const MAX_LENGTH_CATEGORIES = 5;

function Meals() {
  const {
    foods,
    site,
    setSite,
    setSiteKey,
    getFoods,
    getCategories,
    categories,
  } = useContext(FoodsContext);

  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const typeObj = {
    id: 'idMeal',
    str: 'strMeal',
    thumb: 'strMealThumb',
  };

  useEffect(() => {
    const api = 'themealdb';
    setSite(api);
    setSiteKey('meals');
    getFoods(url);
    getCategories(api);
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
    <section>
      <Header title="Meals" iconSearch />
      <main className="foods-main-container">
        <div className="categories-container">
          {
            categories && categories.meals
            && categories.meals.map(({ strCategory }, index) => {
              if (index < MAX_LENGTH_CATEGORIES) {
                return (
                  <Categories
                    category={ strCategory }
                    key={ strCategory }
                    id={ strCategory }
                    site={ site }
                  />
                );
              }
              return undefined;
            })
          }
          <button
            className="all-filters-button"
            type="button"
            onClick={ () => getFoods(url) }
            data-testid="All-category-filter"
          >
            All
          </button>
        </div>
        <div className="foods-main-div">
          {
            foods.meals && foods.meals.length
              && <Recipes foods={ foods.meals } type={ typeObj } />
          }
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default Meals;
