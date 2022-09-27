import React, { useContext, useEffect } from 'react';
import FoodsCards from '../components/FoodsCards';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import fetchApi from '../services/fetchApi';

const MAX_LENGTH_FOODS = 12;
const MAX_LENGTH_CATEGORIES = 5;

function Meals() {
  const {
    foods,
    setFoods,
    site,
    setSite,
    getFoods,
    getCategories,
    categories,
  } = useContext(FoodsContext);

  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const api = 'themealdb';
    getFoods(url);
    setSite(api);
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
        <div>
          {
            categories && categories.meals
            && categories.meals.map(({ strCategory }, index) => {
              if (index < MAX_LENGTH_CATEGORIES) {
                return (<Categories
                  category={ strCategory }
                  key={ strCategory }
                  id={ strCategory }
                  site={ site }
                />);
              }
              return undefined;
            })
          }
          <button
            type="button"
            onClick={ () => fetchApi(url).then((data) => setFoods(data)) }
            data-testid="All-category-filter"
          >
            All
          </button>
        </div>
        <div className="foods-main-div">
          {
            foods.meals && foods.meals.length && foods.meals.map(
              ({ idMeal, strMeal, strMealThumb }, index) => {
                if (index < MAX_LENGTH_FOODS) {
                  return (
                    <FoodsCards
                      key={ idMeal }
                      id={ idMeal }
                      name={ strMeal }
                      img={ strMealThumb }
                      index={ index }
                    />
                  );
                }
                return undefined;
              },
            )
          }
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default Meals;
