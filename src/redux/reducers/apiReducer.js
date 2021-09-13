const initState = {
  fetching: false,
  error: '',
  recipesList: '',
  categories: '',
  recipe: '',
  explore: '',
};

function apiReducer(state = initState, { type, payload }) {
  switch (type) {
  case 'FETCHING':
    return {
      ...initState,
      explore:
      state.explore,
      categories: state.categories,
      fetching: true,
    };

  case 'ERROR':
    return { ...initState, categories: state.categories, error: payload };

  case 'RECIPES_SUCCESS':
    return {
      ...initState,
      categories:
      state.categories,
      recipe: state.recipe,
      recipesList: payload,
      explore: state.explore,
    };

  case 'CATEGORIES_SUCCESS':
    return { ...state, categories: payload };

  case 'RECIPE_SUCCESS':
    return { ...initState, recipesList: state.recipesList, recipe: payload };

  case 'EXPLORE_SUCCESS':
    return { ...state, explore: payload };

  case 'LOGOUT':
    return initState;

  default:
    return state;
  }
}

export default apiReducer;
