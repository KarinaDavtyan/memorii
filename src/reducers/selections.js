import * as typeAction from '../actions'

const defaultState = {
  list: [],
  current: ''
}

const selections = (state = defaultState, action) => {
  switch (action.type) {
  case typeAction.GET_SELECTIONS_SUCCESS:
    return {
      ...state,
      list: action.response
    }
  case typeAction.GET_CURRENT_SELECTION:
    return {
      ...state,
      current: action.title
    }

  default:
    return state

  }
}

export default selections;
