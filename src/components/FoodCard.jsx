import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodsCards.css';
import { useHistory } from 'react-router-dom';
import FoodsContext from '../provider/FoodsContext';

function FoodCards({ id, name, img, index }) {
  const history = useHistory();
  const { siteKey } = useContext(FoodsContext);
  return (
    <button
      type="button"
      className="card-container"
      key={ id }
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`/${siteKey}/${id}`) }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        className="card-img"
        alt={ name }
      />
      <p
        className="card-name"
        data-testid={ `${index}-card-name` }
        href={ `/${siteKey}/${id}` }
      >
        {name}
      </p>
    </button>
  );
}

FoodCards.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FoodCards;
