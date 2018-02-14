import * as typeAction from '../actions'

const defaultState = {
  list: []
}

const words = (state = defaultState, action) => {
  switch (action.type) {
  case typeAction.GET_WORDS_SUCCESS:
    return {
      ...state,
      list: action.response
    }
  default:
    return state
  }
}

export default words;
