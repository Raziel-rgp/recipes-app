import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';
import FoodsCards from '../components/FoodsCards';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
// import fetchApi from '../services/fetchApi';

const MAX_LENGTH_DRINKS = 12;
const MAX_LENGTH_CATEGORIES = 5;

function Drinks() {
  const {
    foods,
    site,
    setSite,
    getFoods,
    getCategories,
    categories,
  } = useContext(FoodsContext);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    const api = 'thecocktaildb';
    getFoods(url);
    setSite(api);
    getCategories(api);
  }, []);

  useEffect(() => {
    const checkFoods = () => {
      if (foods.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    checkFoods();
  }, [foods]);

  return (
    <section>
      <Header title="Drinks" iconSearch />
      <main className="foods-main-container">
        <div>
          {
            categories && categories.drinks
            && categories.drinks.map(({ strCategory }, index) => {
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
            type="button"
            onClick={ () => getFoods(url) }
            data-testid="All-category-filter"
          >
            All
          </button>
        </div>
        <div className="foods-main-div">
          {
            foods.drinks && foods.drinks.length && foods.drinks.map(
              ({ idDrink, strDrink, strDrinkThumb }, index) => {
                if (index < MAX_LENGTH_DRINKS) {
                  return (
                    <FoodsCards
                      key={ idDrink }
                      id={ idDrink }
                      name={ strDrink }
                      img={ strDrinkThumb }
                      index={ index }
                      siteKey="drinks"
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

export default Drinks;
