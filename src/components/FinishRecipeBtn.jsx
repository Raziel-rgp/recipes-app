import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FoodsContext from '../provider/FoodsContext';

function FinishRecipeBtn() {
  const history = useHistory();
  const { finishRecipe } = useContext(FoodsContext);
  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      className="finish-recipe-btn"
      disabled={ !finishRecipe }
      onClick={ () => history.push('/done-recipes') }
      style={ { position: 'fixed', bottom: '0px', right: '45%', left: '45%' } }
    >
      Finish Recipe
    </button>
  );
}

export default FinishRecipeBtn;
