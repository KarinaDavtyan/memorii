import * as typeAction from '../actions'

const defaultState = {
  list: []
}

const selectionsAPI = (state = defaultState, action) => {
  if (action.type === typeAction.GET_SELECTIONS_SUCCESS) {
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
