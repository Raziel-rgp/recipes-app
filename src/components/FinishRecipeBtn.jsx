import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import FoodsContext from '../provider/FoodsContext';

function FinishRecipeBtn({ setDoneRecipe }) {
  const history = useHistory();
  const { finishRecipe } = useContext(FoodsContext);

  const handleClick = () => {
    setDoneRecipe();
    history.push('/done-recipes');
  };

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      className="finish-recipe-btn"
      disabled={ !finishRecipe }
      onClick={ handleClick }
      style={ { position: 'fixed', bottom: '0px', right: '45%', left: '45%' } }
    >
      Finish Recipe
    </button>
  );
}

FinishRecipeBtn.propTypes = {
  setDoneRecipe: PropTypes.func.isRequired,
};

export default FinishRecipeBtn;
