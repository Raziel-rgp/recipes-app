import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';
import FoodsCards from '../components/FoodsCards';
import Footer from '../components/Footer';

const MAX_LENGTH_FOODS = 12;

function Drinks() {
  const { foods, setSite, getFoods } = useContext(FoodsContext);

  useEffect(() => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    getFoods(url);
    setSite('thecocktaildb');
  }, []);

  if (foods.drinks === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  return (
    <section>
      <Header title="Drinks" iconSearch />
      <main className="foods-main-container">
        {
          foods.drinks && foods.drinks.length && foods.drinks.map(
            ({ idDrink, strDrink, strDrinkThumb }, index) => {
              if (index < MAX_LENGTH_FOODS) {
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
      </main>
      <Footer />
    </section>
  );
}

export default Drinks;
