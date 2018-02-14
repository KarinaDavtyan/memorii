import * as typeAction from '../actions'

export default (store) => (next) => (action) => {
  if (action.type === typeAction.GET_SELECTIONS_FAILURE) {
    store.dispatch({
      type: 'CLEAR_AUTHORIZATION'
    })
  }
  return next(action);
}
