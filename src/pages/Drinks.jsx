import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';
import FoodsCards from '../components/FoodsCards';

const MAX_LENGTH_FOODS = 12;

function Drinks() {
  const { foods, setSite } = useContext(FoodsContext);

  useEffect(() => {
    setSite('thecocktaildb');
  }, [setSite]);

  return (
    <main>
      <Header title="Drinks" iconSearch />
      {
        foods && foods.drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => {
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
        })
      }
    </main>
  );
}

export default Drinks;
