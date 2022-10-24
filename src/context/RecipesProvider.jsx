import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const MAX_CATEGORY = 5;

function RecipesProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [btnsDrinks, setBtnsDrinks] = useState([]);
  const [btnsMeals, setBtnsMeals] = useState([]);

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
      // filtrando 5 primeiros
      const urlCategoryDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const urlCategoryMeal = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const fetchCategoryDrink = await fetch(urlCategoryDrink);
      const fetchCategoryMeal = await fetch(urlCategoryMeal);
      const { drinks: categoryDrinks } = await fetchCategoryDrink.json();
      const { meals: categoryMeals } = await fetchCategoryMeal.json();
      setBtnsDrinks(categoryDrinks.filter((_e, index) => index < MAX_CATEGORY));
      setBtnsMeals(categoryMeals.filter((_e, index) => index < MAX_CATEGORY));
    };
    fetchAPIs();
  }, []);

  const contextValue = useMemo(() => ({
    meals,
    drinks,
    btnsDrinks,
    btnsMeals,
  }), [btnsDrinks, btnsMeals, drinks, meals]);

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
