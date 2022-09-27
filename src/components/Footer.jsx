import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <div
      className="footer-container"
      data-testid="footer"
    >
      <button
        type="button"
        className="button-icon drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      >
        <img
          src={ drinkIcon }
          alt="drinks"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        type="button"
        className="button-icon meals-bottom-btn"
        onClick={ () => history.push('/meals') }
      >
        <img
          src={ mealIcon }
          alt="meals"
          data-testid="meals-bottom-btn"
        />
      </button>
    </div>
  );
}

export default Footer;
