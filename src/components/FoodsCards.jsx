import React from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodsCards.css';
import { useHistory } from 'react-router-dom';

function FoodsCards({ id, name, img, index, siteKey }) {
  const history = useHistory();
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

FoodsCards.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  siteKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FoodsCards;
