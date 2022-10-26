import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { getItem } from '../services/LocalStorageFuncs';

import Header from '../components/Header';

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  // const { location: { pathname } } = useHistory();
  // const [path, setPath] = useState('');

  useEffect(() => {
    // setPath(pathname.includes('drink') ? 'drink' : 'meal');
    setRecipes(getItem('doneRecipes'));
  }, []);

  // console.log(pathname);

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
                <img
                  src="src/images/shareIcon.svg"
                  alt="share icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </li>
            )
          ))
        }
      </ul>
    </section>
  );
}

export default DoneRecipes;
