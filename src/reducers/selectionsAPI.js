const defaultState = {
  list: []
}

const selectionsAPI = (state = defaultState, action) => {
  if (action.response) {
    return {
      ...state,
      list: {
        ...state.list,
        ...action.response
      }
    }
  }
  return state
}

export default selectionsAPI;
