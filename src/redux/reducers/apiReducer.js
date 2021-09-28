const initState = {
  fetching: true,
  error: '',
  data: '',
};

function apiReducer(state = initState, { type, payload }) {
  switch (type) {
  case 'FETCHING':
    return {
      fetching: true,
      error: '',
      data: '',
    };

  case 'ERROR':
    return {
      fetching: false,
      error: payload,
      data: '',
    };

  case 'SUCCESS':
    return {
      fetching: false,
      error: '',
      data: payload,
    };

  case 'CLEAR_API_DB':
    return initState;

  default:
    return state;
  }
}

export default apiReducer;
