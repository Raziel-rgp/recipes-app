import React from 'react';
import PropTypes from 'prop-types';

function RecipeCategory({ category }) {
  return (
    <p
      data-testid="recipe-category"
      className="recipe-category"
    >
      {category}
    </p>
  );
}

RecipeCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default RecipeCategory;
