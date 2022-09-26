import React from 'react';
import PropTypes from 'prop-types';

function FoodsCards({ id, name, img, index }) {
  return (
    <div key={ id } data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt={ name }
      />
      <p data-testid={ `${index}-card-name` }>{name}</p>
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
