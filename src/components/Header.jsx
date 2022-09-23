import React from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ title, iconSearch }) {
  return (
    <section>
      <h2 data-testid="page-title">{title}</h2>
      {
        iconSearch
        && <img data-testid="search-top-btn" src={ searchIcon } alt="Search icon" />
      }
      <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile icon" />
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
