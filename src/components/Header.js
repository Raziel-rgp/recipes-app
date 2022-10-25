import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [title, setTitle] = useState('');
  const [searchInput, setSearchInput] = useState(false);
  const history = useHistory();

  function handleClickDisable() {
    setSearchInput(!searchInput);
  }

  useEffect(() => {
    const { pathname } = history.location;
    switch (pathname) {
    case '/meals':
      return setTitle('Meals');
    case '/drinks':
      return setTitle('Drinks');
    case '/profile':
      return setTitle('Profile');
    case '/done-recipes':
      return setTitle('Done Recipes');
    case '/favorite-recipes':
      return setTitle('Favorite Recipes');
    default:
      return pathname;
    }
  }, [history.location, setTitle]);

  return (
    <header>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Icone de perfil"
        />
      </Link>
      {
        (history.location.pathname === '/meals'
        || history.location.pathname === '/drinks')
          && (
            <button
              type="button"
              onClick={ handleClickDisable }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Icone de pesquisa"
              />
            </button>
          )
      }
      {
        searchInput && <input
          type="text"
          name="search"
          data-testid="search-input"
        />
      }
      <h2 data-testid="page-title">{title}</h2>
    </header>
  );
}

export default Header;
