import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import FoodsContext from '../provider/FoodsContext';

function Drinks() {
  const { setSite } = useContext(FoodsContext);

  useEffect(() => {
    setSite('thecocktaildb');
  }, [setSite]);

  return (
    <main>
      <Header title="Drinks" iconSearch />
    </main>
  );
}

export default Drinks;
