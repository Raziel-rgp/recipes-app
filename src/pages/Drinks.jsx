import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';
import FoodsCards from '../components/FoodsCards';
import Footer from '../components/Footer';
import Categories from '../components/Categories';

const MAX_LENGTH_DRINKS = 12;
const MAX_LENGTH_CATEGORIES = 5;

function Drinks() {
  const {
    foods, setSite, getFoods, getCategories, categories,
  } = useContext(FoodsContext);

  useEffect(() => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const site = 'thecocktaildb';
    getFoods(url);
    setSite(site);
    getCategories(site);
  }, []);

  if (foods.drinks === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return (
    <section>
      <Header title="Drinks" iconSearch />
      <main className="foods-main-container">
        <div>
          {
            categories && categories.drinks
            && categories.drinks.map(({ strCategory }, index) => {
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
            foods.drinks && foods.drinks.length && foods.drinks.map(
              ({ idDrink, strDrink, strDrinkThumb }, index) => {
                if (index < MAX_LENGTH_DRINKS) {
                  return (<FoodsCards
                    key={ idDrink }
                    id={ idDrink }
                    name={ strDrink }
                    img={ strDrinkThumb }
                    index={ index }
                  />);
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
