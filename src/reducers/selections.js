const defaultState = {
  list: []
}

const selections = (state = defaultState, action) => {
  switch (action.type) {
  case 'GET_SELECTIONS':
    return {
      list: action.list
    }
  default:
    return state;
  }
};

export default selections;
