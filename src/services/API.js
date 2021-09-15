export const fetchMealsByQuery = async (type, query, dispatch) => {
  const spec = type === 'i' ? 'filter' : 'search';
  const URL = `https://www.themealdb.com/api/json/v1/1/${spec}.php?${type}=${query}`;
  try {
    dispatch({ type: 'FETCHING' });
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch meals recipes');
    const { meals } = await res.json();
    dispatch({ type: 'RECIPES_SUCCESS', payload: meals });
    return meals;
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchDrinksByQuery = async (type, query, dispatch) => {
  const spec = type === 'i' ? 'filter' : 'search';
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/${spec}.php?${type}=${query}`;
  try {
    dispatch({ type: 'FETCHING' });
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch drinks recipes');
    const { drinks } = await res.json();
    dispatch({ type: 'RECIPES_SUCCESS', payload: drinks });
    return drinks;
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchMealsCategories = async (dispatch) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  try {
    // dispatch({ type: 'FETCHING' });
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch meals categories');
    const { meals } = await res.json();
    dispatch({ type: 'CATEGORIES_SUCCESS', payload: meals });
  } catch (error) {
    // dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchDrinksCategories = async (dispatch) => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  try {
    // dispatch({ type: 'FETCHING' });
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch drinks categories');
    const { drinks } = await res.json();
    dispatch({ type: 'CATEGORIES_SUCCESS', payload: drinks });
  } catch (error) {
    // dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchMealsByCategory = async (category, dispatch) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    dispatch({ type: 'FETCHING' });
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch meals recipes');
    const { meals } = await res.json();
    dispatch({ type: 'RECIPES_SUCCESS', payload: meals });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchDrinksByCategory = async (category, dispatch) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    dispatch({ type: 'FETCHING' });
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch drinks recipes');
    const { drinks } = await res.json();
    dispatch({ type: 'RECIPES_SUCCESS', payload: drinks });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchMealById = async (id, dispatch) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch meal recipe');
    const { meals } = await res.json();
    dispatch({ type: 'RECIPE_SUCCESS', payload: meals[0] });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchDrinkById = async (id, dispatch) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch drink recipe');
    const { drinks } = await res.json();
    dispatch({ type: 'RECIPE_SUCCESS', payload: drinks[0] });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchRandomMeal = async (dispatch) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch meal recipe');
    const { meals } = await res.json();
    dispatch({ type: 'RECIPE_SUCCESS', payload: meals[0] });
    return meals[0].idMeal;
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchRandomDrink = async (dispatch) => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch drink recipe');
    const { drinks } = await res.json();
    dispatch({ type: 'RECIPE_SUCCESS', payload: drinks[0] });
    return drinks[0].idDrink;
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchMealIngredients = async (dispatch) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch meal ingredients');
    const { meals } = await res.json();
    dispatch({ type: 'EXPLORE_SUCCESS', payload: meals });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchDrinkIngredients = async (dispatch) => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch drink ingredients');
    const { drinks } = await res.json();
    dispatch({ type: 'EXPLORE_SUCCESS', payload: drinks });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchMealByIngredient = async (dispatch, ing) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`;
  try {
    dispatch({ type: 'FETCHING' });
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch meals recipes by ingredient');
    const { meals } = await res.json();
    dispatch({ type: 'RECIPES_SUCCESS', payload: meals });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchDrinkByIngredient = async (dispatch, ing) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`;
  try {
    dispatch({ type: 'FETCHING' });
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch drink recipes by ingredient');
    const { drinks } = await res.json();
    dispatch({ type: 'RECIPES_SUCCESS', payload: drinks });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchMealAreas = async (dispatch) => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch meal areas');
    const { meals } = await res.json();
    dispatch({ type: 'EXPLORE_SUCCESS', payload: meals });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchMealByArea = async (dispatch, area) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  try {
    dispatch({ type: 'FETCHING' });
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Failed to fetch meals recipes by ingredient');
    const { meals } = await res.json();
    dispatch({ type: 'RECIPES_SUCCESS', payload: meals });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};
