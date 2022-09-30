import React from 'react';
import PropTypes from 'prop-types';

function RecipePhoto({ src, alt }) {
  return (
    <img
      src={ src }
      alt={ alt }
      data-testid="recipe-photo"
      className="recipe-photo"
    />
  );
}

RecipePhoto.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
}.isRequired;

export default RecipePhoto;
