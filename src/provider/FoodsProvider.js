import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import FoodsContext from './FoodsContext';
import fetchApi from '../services/fetchApi';

function FoodsProvider({ children }) {
  const history = useHistory();
  const [foods, setFoods] = useState({});
  const [site, setSite] = useState('');
  const [siteKey, setSiteKey] = useState('');
  const [categories, setCategories] = useState();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipe, setInProgressRecipe] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [finishRecipe, setFinishRecipe] = useState(false);

  const getFoods = (url) => {
    fetchApi(url).then((data) => {
      setFoods(data);
      if (data.meals && data.meals.length === 1) {
        history.push(`/meals/${data.meals[0].idMeal}`);
      }
      if (data.drinks && data.drinks.length === 1) {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      }
    });
  };

  const getCategories = (url) => {
    fetchApi(`https://www.${url}.com/api/json/v1/1/list.php?c=list`)
      .then((data) => setCategories(data));
  };

  const fetchCategory = (type, category) => {
    fetchApi(`https://www.${type}.com/api/json/v1/1/filter.php?c=${category}`)
      .then((categoryListFoods) => {
        setFoods(categoryListFoods);
      });
  };

  const getDoneRecipes = () => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(doneRecipesStorage || []);
  };

  const filteredDoneRecipes = (type) => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (type === 'all') {
      setDoneRecipes(doneRecipesStorage);
    } else {
      const filteredRecipes = doneRecipesStorage.filter((recipe) => recipe.type === type);
      setDoneRecipes(filteredRecipes);
    }
  };

  const getRecipeInProgress = (siteFood, id) => {
    const url = (`https://www.${siteFood}.com/api/json/v1/1/lookup.php?i=${id}`);
    fetchApi(url).then((data) => setInProgressRecipe(data));
  };

  const getFavoriteRecipes = () => {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(favoriteRecipesStorage || []);
  };

  const filteredFavoriteRecipes = (type) => {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'all') {
      setFavoriteRecipes(favoriteRecipesStorage);
    } else {
      const filteredRecipes = favoriteRecipesStorage.filter(
        (recipe) => recipe.type === type,
      );
      setFavoriteRecipes(filteredRecipes);
    }
  };

  const contextType = {
    foods,
    setFoods,
    getFoods,
    site,
    setSite,
    siteKey,
    getRecipeInProgress,
    setSiteKey,
    inProgressRecipe,
    getCategories,
    categories,
    fetchCategory,
    getDoneRecipes,
    doneRecipes,
    setFinishRecipe,
    finishRecipe,
    filteredDoneRecipes,
    setFavoriteRecipes,
    getFavoriteRecipes,
    favoriteRecipes,
    filteredFavoriteRecipes,
  };

  return (
    <FoodsContext.Provider value={ contextType }>
      {children}
    </FoodsContext.Provider>
  );
}

FoodsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodsProvider;
