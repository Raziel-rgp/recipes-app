import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetailsCarousel({ recommendation, carouselKey, carouselObjKeys }) {
  const MAX_LENGTH = 6;
  return (
    <div>
      {
        recommendation[carouselKey]
          && (
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
            }))
      }
    </div>
  );
}

RecipeDetailsCarousel.propTypes = {
  recommendation: PropTypes.shape.isRequired,
  carouselKey: PropTypes.string.isRequired,
  carouselObjKeys: PropTypes.shape,
};

RecipeDetailsCarousel.defaultProps = {
  carouselObjKeys: {
    img: '',
    name: '',
  },
};

export default RecipeDetailsCarousel;
