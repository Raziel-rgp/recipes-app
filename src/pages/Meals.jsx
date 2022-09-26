import React, { useContext } from 'react';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';

function Meals() {
  const { foods } = useContext(FoodsContext);
  return (
    <main>
      <Header title="Meals" iconSearch />
    </main>
  );
}

export default Meals;
