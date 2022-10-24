import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchAPIs = async () => {
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const responseMeals = await fetch(urlMeals);
      const { meals: comidas } = await responseMeals.json();
      const responseDrinks = await fetch(urlDrinks);
      const { drinks: bebidas } = await responseDrinks.json();
      setDrinks(bebidas);
      setMeals(comidas);
    };
    fetchAPIs();
  }, []);

  const contextValue = useMemo(() => ({
    meals,
    drinks,
  }), [drinks, meals]);

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
