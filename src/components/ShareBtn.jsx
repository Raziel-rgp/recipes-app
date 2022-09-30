import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

const TIME_COPY = 3000;

function ShareBtn({ id, index, type }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    const auxType = type === 'meal' || type === 'meals' ? 'meals' : 'drinks';
    const url = `${window.location.protocol}//${window.location.host}/${auxType}/${id}`;
    copy(url);
    setCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), TIME_COPY);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div>
      <button
        type="button"
        className="button-icon"
        onClick={ copyLink }
      >
        <img
          src={ shareIcon }
          alt="Share icon"
          data-testid={ typeof index === 'number'
            ? `${index}-horizontal-share-btn` : 'share-btn' }
        />
      </button>
      { copied && <p>Link copied!</p> }
    </div>
  );
}

ShareBtn.propTypes = {
  index: PropTypes.number,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

ShareBtn.defaultProps = {
  index: null,
};

export default ShareBtn;
