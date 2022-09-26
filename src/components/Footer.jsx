import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <div
      data-testid="footer"
      className="footer"
    >
      <button
        type="button"
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
