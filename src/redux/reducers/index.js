import { combineReducers } from 'redux';
import user from './userReducer';
import recipes from './recipesReducer';
import api from './apiReducer';

const rootReducer = combineReducers({ user, recipes, api });

export default rootReducer;
