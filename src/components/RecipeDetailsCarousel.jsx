import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetailsCarousel({ recommendation, carouselKey, carouselObjKeys }) {
  const MAX_LENGTH = 6;
  return recommendation[carouselKey]
    ? (
      recommendation[carouselKey].map((item, index) => {
        if (index < MAX_LENGTH) {
          return (
            <div
              className="carousel-card"
              data-testid={ `${index}-recommendation-card` }
              key={ item[carouselObjKeys.name] }
            >
              <h3
                data-testid={ `${index}-recommendation-title` }
              >
                { item[carouselObjKeys.name] }
              </h3>
              <img
                className="carousel-images"
                src={ item[carouselObjKeys.img] }
                alt=""
              />
            </div>
          );
        }
        return undefined;
      })) : null;
}

RecipeDetailsCarousel.propTypes = {
  recommendation: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.shape({
      strDrink: PropTypes.string,
    })),
    meals: PropTypes.arrayOf(PropTypes.shape({
      strDrink: PropTypes.string,
    })),
  }).isRequired,
  carouselKey: PropTypes.string.isRequired,
  carouselObjKeys: PropTypes.shape({
    name: PropTypes.string,
    img: PropTypes.string,
  }),
};

RecipeDetailsCarousel.defaultProps = {
  carouselObjKeys: {
    img: '',
    name: '',
  },
};

export default RecipeDetailsCarousel;
