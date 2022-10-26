import React, { useEffect, useState } from 'react';
import { getItem } from '../services/LocalStorageFuncs';

import Header from '../components/Header';

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    setRecipes(getItem('doneRecipes'));
  }, []);

  return (
    <section>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <ul>
        {
          recipes.map((dr, index) => (
            <li key={ dr.id }>
              <img
                src={ dr.image }
                alt={ dr.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>{ dr.category }</p>
              <p data-testid={ `${index}-horizontal-name` }>{ dr.name }</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{ dr.doneDate }</p>
              <div>
                {
                  dr.tags.map((tag) => (
                    <p
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      { tag }
                    </p>
                  ))
                }
              </div>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
              >
                Compartilhar
              </button>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default DoneRecipes;
