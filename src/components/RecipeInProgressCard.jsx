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

function RecipeInProgressCard(
  { type, image, title, id, category, instructions, ingredients,
    alcoholicOrNot, nationality },
) {
  return (
    <section>
      <div>
        <RecipePhoto src={ image } alt={ title } />
        <RecipeCategory category={ category } />
        <RecipeTitle title={ title } />
        <div>
          <ShareBtn id={ id } type={ type } />
          <FavoriteBtn
            id={ id }
            category={ category }
            name={ title }
            alcoholicOrNot={ alcoholicOrNot }
            nationality={ nationality }
            image={ image }
            type={ type }
          />
        </div>
      </div>
      <IngredientsStep type={ type } id={ id } ingredients={ ingredients } />
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
  type: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.object),
  alcoholicOrNot: PropTypes.string,
  nationality: PropTypes.string,
}.isRequired;

export default RecipeInProgressCard;
