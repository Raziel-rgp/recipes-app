import React from 'react';
import PropTypes from 'prop-types';

function FiltersFoods({ filterFunction }) {
  return (
    <section>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        value="all"
        onClick={ ({ target: { value } }) => filterFunction(value) }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        value="meal"
        type="button"
        onClick={ ({ target: { value } }) => filterFunction(value) }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        value="drink"
        type="button"
        onClick={ ({ target: { value } }) => filterFunction(value) }
      >
        Drinks
      </button>
    </section>
  );
}

FiltersFoods.propTypes = {
  filterFunction: PropTypes.func.isRequired,
};

export default FiltersFoods;
