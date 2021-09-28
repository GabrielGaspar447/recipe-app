import axios from 'axios';

export const fetchMealsByQuery = async (type, query) => {
  const spec = type === 'i' ? 'filter' : 'search';
  const URL = `https://www.themealdb.com/api/json/v1/1/${spec}.php?${type}=${query}`;
  return axios.get(URL);
};

export const fetchDrinksByQuery = async (type, query) => {
  const spec = type === 'i' ? 'filter' : 'search';
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/${spec}.php?${type}=${query}`;
  return axios.get(URL);
};

export const fetchMealsCategories = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  return axios.get(URL);
};

export const fetchDrinksCategories = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  return axios.get(URL);
};

export const fetchMealsByCategory = async (category) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  return axios.get(URL);
};

export const fetchDrinksByCategory = async (category) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  return axios.get(URL);
};

export const fetchMealById = async (id) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  return axios.get(URL);
};

export const fetchDrinkById = async (id) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return axios.get(URL);
};

export const fetchRandomMeal = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return axios.get(URL);
};

export const fetchRandomDrink = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  return axios.get(URL);
};

export const fetchMealIngredients = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  return axios.get(URL);
};

export const fetchDrinkIngredients = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  return axios.get(URL);
};

export const fetchMealByIngredient = async (ing) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`;
  return axios.get(URL);
};

export const fetchDrinkByIngredient = async (ing) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`;
  return axios.get(URL);
};

export const fetchMealAreas = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  return axios.get(URL);
};

export const fetchMealByArea = async (area) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  return axios.get(URL);
};
