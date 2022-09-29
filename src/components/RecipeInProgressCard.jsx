import React from 'react';
import PropTypes from 'prop-types';
import RecipePhoto from './RecipePhoto';
import RecipeTitle from './RecipeTitle';
import ShareBtn from './ShareBtn';
import RecipeCategory from './RecipeCategory';
import Instructions from './Instructions';
import FinishRecipeBtn from './FinishRecipeBtn';
import FavoriteBtn from './FavoriteBtn';
import IngredientsStep from './IngredientsStep';

function RecipeInProgressCard({ image, title, id, category, instructions, ingredients }) {
  return (
    <section>
      <div>
        <RecipePhoto src={ image } alt={ title } />
        <RecipeCategory category={ category } />
        <RecipeTitle title={ title } />
        <div>
          <ShareBtn id={ id } type="drinks" />
          <FavoriteBtn />
        </div>
      </div>
      <IngredientsStep ingredients={ ingredients } />
      <Instructions instructions={ instructions } />
      <FinishRecipeBtn />
    </section>
  );
}

RecipeInProgressCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  category: PropTypes.string,
  instructions: PropTypes.string,
}.isRequired;

export default RecipeInProgressCard;
