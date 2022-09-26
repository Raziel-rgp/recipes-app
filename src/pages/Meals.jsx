import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';

function Meals() {
  const { foods, setSite } = useContext(FoodsContext);

  useEffect(() => {
    setSite('themealdb');
  }, [setSite]);

  return (
    <main>
      <Header title="Meals" iconSearch site="themealdb" />
    </main>
  );
}

export default Meals;
