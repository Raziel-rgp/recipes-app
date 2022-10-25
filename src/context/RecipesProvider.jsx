import React, { useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import useLocalStorage from '../hooks/useLocalStorage';

const MAX_CATEGORY = 5;
const INITIAL_IN_PROGRESS = {
  drinks: {
    0: [],
  },
  meals: {
    0: [],
  },
};

function RecipesProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [drinksFilter, setDrinksFilter] = useState([]);
  const [meals, setMeals] = useState([]);
  const [mealsFilter, setMealsFilter] = useState([]);
  const [btnsDrinks, setBtnsDrinks] = useState([]);
  const [btnsMeals, setBtnsMeals] = useState([]);
  const { state: doneRecipes,
    setState: setDoneRecipes } = useLocalStorage('DoneRecipes', []);
  const {
    state: inProgressRecipes,
    setState: setInProgressRecipes,
  } = useLocalStorage('inProgressRecipes', INITIAL_IN_PROGRESS);

  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const responseMeals = await fetch(urlMeals);
        const { meals: comidas } = await responseMeals.json();
        const responseDrinks = await fetch(urlDrinks);
        const { drinks: bebidas } = await responseDrinks.json();
        setDrinks(bebidas);
        setDrinksFilter(bebidas);
        setMeals(comidas);
        setMealsFilter(comidas);
        // filtrando 5 primeiros
        const urlCategoryDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        const urlCategoryMeal = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const fetchCategoryDrink = await fetch(urlCategoryDrink);
        const fetchCategoryMeal = await fetch(urlCategoryMeal);
        const { drinks: categoryDrinks } = await fetchCategoryDrink.json();
        const { meals: categoryMeals } = await fetchCategoryMeal.json();
        setBtnsDrinks(categoryDrinks.filter((_e, index) => index < MAX_CATEGORY));
        setBtnsMeals(categoryMeals.filter((_e, index) => index < MAX_CATEGORY));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPIs();
  }, []);

  const clickCategory = useCallback(async ({ target }, type) => {
    if (type === 'drink') {
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.innerText}`;
        const response = await fetch(url);
        const { drinks: df } = await response.json();
        setDrinksFilter(df);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.innerText}`;
        const response = await fetch(url);
        const { meals: mf } = await response.json();
        setMealsFilter(mf);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const clearAllFilters = useCallback((type) => {
    if (type === 'drink') {
      setDrinksFilter(drinks);
    } else {
      setMealsFilter(meals);
    }
  }, [drinks, meals]);

  const findRecipeById = useCallback(async (id, type) => {
    try {
      if (type === 'drinks') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(url);
        const { drinks: bebidas } = await response.json();
        return bebidas[0];
      }
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const { meals: comidas } = await response.json();
      return comidas[0];
    } catch (error) {
      console.log(error);
    }
  }, []);

  const contextValue = useMemo(() => ({
    drinks,
    meals,
    mealsFilter,
    drinksFilter,
    btnsDrinks,
    btnsMeals,
    clickCategory,
    clearAllFilters,
    findRecipeById,
    doneRecipes,
    setDoneRecipes,
    inProgressRecipes,
    setInProgressRecipes,
  }), [
    inProgressRecipes,
    setInProgressRecipes,
    doneRecipes,
    setDoneRecipes,
    drinks,
    meals,
    btnsDrinks,
    btnsMeals,
    drinksFilter,
    mealsFilter,
    clickCategory,
    clearAllFilters,
    findRecipeById,
  ]);

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
