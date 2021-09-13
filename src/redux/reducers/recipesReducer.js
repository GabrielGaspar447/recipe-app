const clearRecProgress = (progressObj, payload) => {
  if (payload.type === 'comida') {
    delete progressObj.meals[payload.id];
  } else {
    delete progressObj.cocktails[payload.id];
  }

  return progressObj;
};

const lsDoneRecipes = localStorage.doneRecipes;
const lsFavoriteRecipes = localStorage.favoriteRecipes;
const lsInProgressRecipes = localStorage.inProgressRecipes;

const initialState = {
  doneRecipes: lsDoneRecipes ? JSON.parse(lsDoneRecipes) : [],
  favoriteRecipes: lsFavoriteRecipes ? JSON.parse(lsFavoriteRecipes) : [],
  inProgressRecipes: lsInProgressRecipes ? JSON.parse(lsInProgressRecipes)
    : {
      cocktails: {},
      meals: {},
    },
};

function recipesReducer(state = initialState, { type, payload }) {
  switch (type) {
  case 'UPDATE_FAVORITES':
    return { ...state, favoriteRecipes: payload };

  case 'UPDATE_PROGRESS':
    return { ...state, inProgressRecipes: payload };

  case 'FINISH_RECIPE':
    return {
      ...state,
      inProgressRecipes: clearRecProgress(state.inProgressRecipes, payload),
      doneRecipes: [...state.doneRecipes, payload],
    };

  case 'LOGOUT':
    return {
      doneRecipes: [],
      favoriteRecipes: [],
      inProgressRecipes: { cocktails: {}, meals: {} },
    };

  default:
    return state;
  }
}

export default recipesReducer;
