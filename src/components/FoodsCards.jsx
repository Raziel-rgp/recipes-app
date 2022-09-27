import React from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodsCards.css';

function FoodsCards({ id, name, img, index }) {
  return (
    <div className="card-container" key={ id } data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        className="card-img"
        alt={ name }
      />
      <p className="card-name" data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

FoodsCards.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FoodsCards;
