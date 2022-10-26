import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { setItem, getItem } from '../services/LocalStorageFuncs';
import RecipesContext from '../context/RecipesContext';
import '../styles/RecipeInProgress.css';
import heartWhite from '../images/whiteHeartIcon.svg';
import heartBlack from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgressCard() {
  const [clipboard, setClipBoard] = useState();
  const { findRecipeById, favoriteRecipes,
    setFavoriteRecipes } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [checks, setChecks] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    if (type !== '') {
      const saveIngredients = getItem('inProgressRecipes')[type];
      if (typeof saveIngredients === 'object'
        && Object.keys(saveIngredients).includes(id)) {
        setChecks(saveIngredients[id]);
      }
    }
  }, [id, type]);

  const getIngredients = useCallback(() => {
    const keysDataIngredients = Object.keys(data)
      .filter((e) => e.includes('strIngredient'));
    const filterIngredients = keysDataIngredients.filter((e) => data[e] !== null);
    const filterVazios = filterIngredients.filter((e) => data[e] !== '');
    setIngredients(filterVazios);
  }, [data]);

  useEffect(() => {
    let typeFood = '';

    const asyncOperation = async () => {
      if (pathname.includes('drinks')) {
        typeFood = 'drinks';
        setType(typeFood);
        const dados = await findRecipeById(id, typeFood);
        setData(dados);
      } else {
        typeFood = 'meals';
        setType(typeFood);
        const dados = await findRecipeById(id, typeFood);
        setData(dados);
      }
    };

    asyncOperation();
    getIngredients();
  }, [pathname, findRecipeById, id, getIngredients]);

  useEffect(() => {
    if (checks.length > 0 && type !== '') {
      const saveObj = getItem('inProgressRecipes');
      saveObj[type][id] = checks;
      setItem('inProgressRecipes', saveObj);
    } else if (checks.length === 0 && type) {
      const saveObj = getItem('inProgressRecipes');
      saveObj[type][id] = [];
      setItem('inProgressRecipes', saveObj);
    }
  }, [checks, id, type]);

  const handleCheck = (ingredient) => {
    if (!checks.some((e) => e === ingredient)) {
      setChecks([...checks, ingredient]);
    } else {
      setChecks(checks.filter((e) => e !== ingredient));
    }
  };

  const clickClipBoard = async () => {
    try {
      setClipBoard(true);
      let url = `http://localhost:3000${pathname}`;
      url = url.replace('/in-progress', '');
      await copy(url);
    } catch (error) {
      console.log(error);
      setClipBoard(false);
    }
  };

  const clickFavorite = () => {
    if (!favoriteRecipes.some((e) => e.id === id)) {
      let favRecipe = {};
      if (type === 'drinks') {
        favRecipe = {
          id: data.idDrink,
          type: 'drink',
          nationality: '',
          category: data.strCategory,
          alcoholicOrNot: data.strAlcoholic,
          name: data.strDrink,
          image: data.strDrinkThumb,
        };
      } else {
        favRecipe = {
          id: data.idMeal,
          type: 'meal',
          nationality: data.strArea,
          category: data.strCategory,
          alcoholicOrNot: '',
          name: data.strMeal,
          image: data.strMealThumb,
        };
      }
      setFavoriteRecipes([...favoriteRecipes, favRecipe]);
    } else {
      setFavoriteRecipes(favoriteRecipes.filter((e) => +e.id !== +id));
    }
  };

  const cond = ingredients.length !== 0 ? ingredients.length === checks.length : false;

  return (
    <div>
      {
        clipboard && <div data-testid="msg_copy_sucess">Link copied!</div>
      }
      <button
        type="button"
        onClick={ clickClipBoard }
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        onClick={ clickFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ favoriteRecipes.some((e) => e.id === id) ? heartBlack : heartWhite }
          alt={ id }
        />
      </button>
      {
        pathname.includes('drinks') ? (
          <section>
            <h1 data-testid="recipe-title">
              { data.strGlass }
            </h1>
            <h3 data-testid="recipe-category">
              { data.strCategory }
            </h3>
            <h5>
              { data.strAlcoholic }
            </h5>
            <img
              data-testid="recipe-photo"
              src={ data.strDrinkThumb }
              alt={ data.strDrink }
            />

            <section>
              {
                ingredients.map((steps, index) => (
                  <label
                    className={ checks
                      .some((e) => e === data[steps]) ? 'done' : undefined }
                    key={ index }
                    htmlFor={ `${index} - check` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    { data[steps] }
                    <input
                      type="checkbox"
                      id={ `${index} - check` }
                      onClick={ () => handleCheck(data[steps]) }
                      defaultChecked={ checks.some((e) => e === data[steps]) }
                    />
                  </label>
                ))
              }
            </section>

            <p data-testid="instructions">
              { data.strInstructions }
            </p>
          </section>
        ) : (
          <section>
            <h1 data-testid="recipe-title">
              { data.strMeal }
            </h1>
            <h3 data-testid="recipe-category">
              { data.strCategory }
            </h3>
            <img
              data-testid="recipe-photo"
              src={ data.strMealThumb }
              alt={ data.strMeal }
            />

            <section>
              {
                ingredients.map((mealStep, index) => (
                  <label
                    className={ checks
                      .some((e) => e === data[mealStep]) ? 'done' : undefined }
                    key={ index }
                    htmlFor={ `${index} - check` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    { data[mealStep] }
                    <input
                      type="checkbox"
                      id={ `${index} - check` }
                      onClick={ () => handleCheck(data[mealStep]) }
                      defaultChecked={ checks.some((e) => e === data[mealStep]) }
                    />
                  </label>
                ))
              }
            </section>

            <p data-testid="instructions">
              { data.strInstructions }
            </p>
          </section>
        )
      }
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="finish"
        disabled={ !cond }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgressCard;
