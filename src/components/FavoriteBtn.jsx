import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn() {
  return (
    <button
      type="button"
      data-testid="favorite-btn"
      className="button-icon"
    >
      <img src={ whiteHeartIcon } alt="White heart icon" />
    </button>
  );
}

export default FavoriteBtn;
