import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { getItem } from '../services/LocalStorageFuncs';

import Header from '../components/Header';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [clipboard, setClipBoard] = useState();
  // const { location: { pathname } } = useHistory();

  useEffect(() => {
    setRecipes(getItem('doneRecipes'));
  }, []);

  console.log(recipes);

  const clickClipBoard = async (pathname) => {
    // console.log(target.id);
    try {
      setClipBoard(true);
      const url = `http://localhost:3000${pathname}`;
      await copy(url);
    } catch (error) {
      console.log(error);
      setClipBoard(false);
    }
  };

  return (
    <section>
      { clipboard && <p>Link copied!</p>}
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
          recipes?.map((dr, index) => (
            (
              <li key={ dr.id }>
                <img
                  src={ dr.image }
                  alt={ dr.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-name` }>{ dr.name }</p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {
                    dr.type === 'meal'
                      ? `${dr.nationality} - ${dr.category}`
                      : `${dr.alcoholicOrNot}`
                  }
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{ dr.doneDate }</p>
                <div>
                  {
                    dr.tags.filter((_t, i) => i < 2)
                      .map((tag) => (
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
                  onClick={ () => clickClipBoard(`/${dr.type}s/${dr.id}`) }
                >
                  <img
                    src="./src/images/shareIcon.svg"
                    alt="Compartilhar"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
              </li>
            )
          ))
        }
      </ul>
    </section>
  );
}

export default DoneRecipes;
