const defaultState = {
  list: [],
  current: ''
}

const selections = (state = defaultState, action) => {
  switch (action.type) {
  case 'GET_SELECTIONS':
    return {
      ...state,
      list: action.list
    }
  case 'GET_CURRENT_SELECTION':
    return {
      ...state,
      current: action.title
    }
  default:
    return state;
  }
};

export default selections;
