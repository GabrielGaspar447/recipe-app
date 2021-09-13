import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

store.subscribe(() => {
  const { email, mealsToken, cocktailsToken } = store.getState().user;
  const { doneRecipes, favoriteRecipes, inProgressRecipes } = store.getState().recipes;

  localStorage.mealsToken = mealsToken;
  localStorage.cocktailsToken = cocktailsToken;
  localStorage.user = JSON.stringify({ email });
  localStorage.doneRecipes = JSON.stringify(doneRecipes);
  localStorage.favoriteRecipes = JSON.stringify(favoriteRecipes);
  localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
});
