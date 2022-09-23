import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DetailsDrink from './pages/DetailsDrink';
import DetailsMeal from './pages/DetailsMeal';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import InProgressDrink from './pages/InProgressDrink';
import InProgressMeal from './pages/InProgressMeal';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/meals/:id/in-progress" component={ InProgressMeal } />
      <Route exact path="/drinks/:id/in-progress" component={ InProgressDrink } />
      <Route exact path="/meals/:id" component={ DetailsMeal } />
      <Route exact path="/drinks/:id" component={ DetailsDrink } />
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
