import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareBtn from './ShareBtn';
import '../styles/DoneRecipeCard.css';

function DoneRecipeCard(
  { id, image, nationality, category, name, doneDate,
    tags, index, alcoholicOrNot, type },
) {
  const history = useHistory();

  const auxType = type === 'meal' ? 'meals' : 'drinks';

  return (
    <div>
      <div>
        <button
          type="button"
          className="button-icon"
          onClick={ () => history.push(`/${auxType}/${id}`) }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
            className="done-recipe-img-card"
          />
        </button>
      </div>
      <div>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${alcoholicOrNot.length ? alcoholicOrNot : nationality} - ${category}`}
        </p>
        <button
          type="button"
          onClick={ () => history.push(`/${auxType}/${id}`) }
          className="button-icon"
        >
          <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        </button>
        <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
        <ShareBtn type={ type } id={ id } index={ index } />
        {
          tags.length && tags.map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </p>
          ))
        }
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  image: PropTypes.string,
  nationality: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number,
  alcoholicOrNot: PropTypes.string,
}.isRequired;

export default DoneRecipeCard;
