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
  case typeAction.POST_WORDS_SUCCESS:
    return {
      ...state,
      list: state.list.concat(action.response)
    }
  case typeAction.DELETE_WORDS_SUCCESS:
    return {
      ...state,
      list: state.list
        .filter(item => item._id !== action.response._id)
    }
  default:
    return state
  }
}

export default words;
