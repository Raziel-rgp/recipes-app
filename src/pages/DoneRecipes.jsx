import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import FiltersFoods from '../components/FiltersFoods';
import FoodsContext from '../provider/FoodsContext';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const { getDoneRecipes, doneRecipes, filteredDoneRecipes } = useContext(FoodsContext);

  useEffect(() => {
    getDoneRecipes();
  }, []);

  return (
    <section>
      <Header title="Done Recipes" />
      <FiltersFoods filterFunction={ filteredDoneRecipes } />
      {
        doneRecipes.length > 0 && doneRecipes.map(
          (
            {
              id, nationality, image, category, name,
              doneDate, alcoholicOrNot, tags, type },
            index,
          ) => (
            <DoneRecipeCard
              key={ id }
              id={ id }
              image={ image }
              nationality={ nationality }
              category={ category }
              name={ name }
              alcoholicOrNot={ alcoholicOrNot }
              doneDate={ doneDate }
              tags={ tags }
              index={ index }
              type={ type }
            />
          ),
        )
      }
    </section>
  );
}

export default DoneRecipes;
