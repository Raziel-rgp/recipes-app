import React from 'react';
import PropTypes from 'prop-types';

function Categories({ category }) {
  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
    >
      <p>
        { category }
      </p>
    </button>
  );
}

Categories.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Categories;
