import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="mealIcon" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
