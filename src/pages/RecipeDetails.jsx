import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';

function RecipeDetails({ match, site }) {
  const { id } = match.params;
  useEffect(() => {
    const request = async () => {
      try {
        const result = await fetchApi(`https://www.${site}.com/api/json/v1/1/lookup.php?i=${id}`);
        console.log(result);
      } catch (error) {
        console.log('esse é o erro:', error);
      }
    };
    request();
  }, []);
  return (
    <div>RecipeDetails</div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape.isRequired,
  site: PropTypes.string.isRequired,
};

export default RecipeDetails;
