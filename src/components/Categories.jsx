import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FoodsContext from '../provider/FoodsContext';

function Categories({ category, id, site }) {
  const { fetchCategory, getFoods } = useContext(FoodsContext);
  const [selected, setSelect] = useState(false);

  const handleClick = () => {
    if (!selected) {
      fetchCategory(site, category);
    } else {
      getFoods(`https://www.${site}.com/api/json/v1/1/search.php?s=`);
    }
    setSelect(!selected);
  };

  return (
    <div>
      <button
        id={ id }
        type="button"
        onClick={ handleClick }
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
