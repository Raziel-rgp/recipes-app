import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, iconSearch }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  const showSearchBar = () => {
    setShowInput(!showInput);
  };

  return (
    <section>
      <h2 data-testid="page-title">{title}</h2>
      {
        iconSearch
        && (
          <button
            style={ { marginLeft: '5px' } }
            type="button"
            onClick={ showSearchBar }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Search icon"
            />
          </button>
        )
      }
      <button
        style={ { marginLeft: '5px' } }
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile icon"
        />
      </button>
      {
        showInput
        && <SearchBar />
      }
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  iconSearch: PropTypes.bool,
};

Header.defaultProps = {
  iconSearch: false,
};

export default Header;
