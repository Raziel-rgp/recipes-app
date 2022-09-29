import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeDetails from './pages/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function Routes() {
  const mealsObj = {
    img: 'strMealThumb',
    name: 'strMeal',
  };

  const drinksObj = {
    img: 'strDrinkThumb',
    name: 'strDrink',
  };

  return (
    <Switch>
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route
        exact
        path="/meals/:id"
        render={
          (props) => (
            <RecipeDetails
              { ...props }
              site="themealdb"
              siteKey="meals"
              typeKeysObj={ mealsObj }
            />)
        }
      />
      <Route
        exact
        path="/drinks/:id"
        render={
          (props) => (
            <RecipeDetails
              { ...props }
              site="thecocktaildb"
              siteKey="drinks"
              typeKeysObj={ drinksObj }
            />)
        }
      />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
