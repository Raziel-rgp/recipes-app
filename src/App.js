import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Recipes from './components/Recipes';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route
          exact
          path="/drinks"
          render={ (props) => <Recipes { ...props } name="drinks" /> }
        />
        <Route
          exact
          path="/meals"
          render={ (props) => <Recipes { ...props } name="meals" /> }
        />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
