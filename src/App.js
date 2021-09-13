import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Foods, FoodDetails, FoodInProgress } from './pages/Food';
import { Drinks, DrinkDetails, DrinkInProgress } from './pages/Drink';
import { DoneRecipes, FavoriteRecipes, Login, NotFound, Profile } from './pages/Others';
import { Explore, ExploreDrinks, ExploreDrinksByIng, ExploreFoods,
  ExploreFoodsByArea, ExploreFoodsByIng } from './pages/Explore';

function App() {
  return (
    <Switch>

      <Route exact path="/">
        <Login />
      </Route>

      <Route exact path="/comidas">
        <Foods />
      </Route>

      <Route exact path="/bebidas">
        <Drinks />
      </Route>

      <Route exact path="/comidas/:id">
        <FoodDetails />
      </Route>

      <Route exact path="/bebidas/:id">
        <DrinkDetails />
      </Route>

      <Route exact path="/comidas/:id/in-progress">
        <FoodInProgress />
      </Route>

      <Route exact path="/bebidas/:id/in-progress">
        <DrinkInProgress />
      </Route>

      <Route exact path="/explorar">
        <Explore />
      </Route>

      <Route exact path="/explorar/comidas">
        <ExploreFoods />
      </Route>

      <Route exact path="/explorar/bebidas">
        <ExploreDrinks />
      </Route>

      <Route exact path="/explorar/comidas/ingredientes">
        <ExploreFoodsByIng />
      </Route>

      <Route exact path="/explorar/bebidas/ingredientes">
        <ExploreDrinksByIng />
      </Route>

      <Route exact path="/explorar/comidas/area">
        <ExploreFoodsByArea />
      </Route>

      <Route exact path="/perfil">
        <Profile />
      </Route>

      <Route exact path="/receitas-feitas">
        <DoneRecipes />
      </Route>

      <Route exact path="/receitas-favoritas">
        <FavoriteRecipes />
      </Route>

      <Route exact path="*">
        <NotFound />
      </Route>

    </Switch>
  );
}

export default App;
