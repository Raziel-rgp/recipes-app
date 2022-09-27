import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title, iconSearch }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  return (
    <section className="header-container">
      <section className="header-nav-container">
        <div />
        <div className="icons-nav-container">
          {
            iconSearch
        && (
          <button
            className="button-icon search-top-btn"
            type="button"
            onClick={ () => setShowInput(!showInput) }
          >
            <img
              className="search-icon"
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Search icon"
            />
          </button>
        )
          }
          <button
            className="button-icon profile-top-btn"
            type="button"
            onClick={ () => history.push('/profile') }
          >
            <img
              className="search-icon"
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile icon"
            />
          </button>
        </div>
      </section>
      <h2 className="page-title" data-testid="page-title">{title}</h2>
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
