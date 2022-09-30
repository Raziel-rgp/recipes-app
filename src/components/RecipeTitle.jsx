import React from 'react';
import PropTypes from 'prop-types';

function RecipeTitle({ title }) {
  return (
    <h2 data-testid="recipe-title">{ title }</h2>
  );
}

RecipeTitle.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default RecipeTitle;
