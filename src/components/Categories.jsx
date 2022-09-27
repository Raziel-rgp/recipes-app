import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FoodsContext from '../provider/FoodsContext';

function Categories({ category, id, site }) {
  const { fetchCategory } = useContext(FoodsContext);
  return (
    <div>
      <button
        id={ id }
        type="button"
        onClick={ () => fetchCategory(site, category) }
        data-testid={ `${category}-category-filter` }
      >
        <p>
          { category }
        </p>
      </button>
    </div>
  );
}

Categories.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
};

export default Categories;
