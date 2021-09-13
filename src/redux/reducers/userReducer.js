// import { } from '../actions';

const lsUser = localStorage.user;
const lsMealsToken = localStorage.mealsToken;
const lsCocktailsToken = localStorage.cocktailsToken;

const initialState = {
  email: lsUser ? JSON.parse(lsUser).email : '',
  mealsToken: lsMealsToken ? JSON.parse(lsMealsToken) : '',
  cocktailsToken: lsCocktailsToken ? JSON.parse(lsCocktailsToken) : '',
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
  case 'REGISTER_USER':
    return payload;

  case 'LOGOUT':
    return {
      email: '',
      mealsToken: '',
      cocktailsToken: '',
    };

  default:
    return state;
  }
}

export default userReducer;
