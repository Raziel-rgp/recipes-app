import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetailsVideo({ siteKey, src }) {
  return (
    <div>
      {
        siteKey === 'meals'
        && (
          <video
            data-testid="video"
            width="360"
            height="200"
            controls
            src={ src }
          >
            <track kind="captions" />
          </video>
        )
      }
    </div>
  );
}

RecipeDetailsVideo.propTypes = {
  siteKey: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default RecipeDetailsVideo;
