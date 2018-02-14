import * as typeAction from '../actions'

export default (store) => (next) => (action) => {
  if (action.type === typeAction.GET_SELECTIONS_FAILURE) {
    store.dispatch({
      type: 'CLEAR_AUTHORIZATION'
    })
  }

  if (action.type.match(/CREATE\S+SUCCESS/) !== null) {
    store.dispatch({
      type: 'SHOW_NOTIFICATION',
      msg: 'Succesfully created'
    })
  }

  if (action.type.match(/POST\S+SUCCESS/) !== null) {
    store.dispatch({
      type: 'SHOW_NOTIFICATION',
      msg: 'Succesfully added'
    })
  }

  if (action.type.match(/DELETE\S+SUCCESS/) !== null) {
    store.dispatch({
      type: 'SHOW_NOTIFICATION',
      msg: 'Succesfully deleted'
    })
  }
  return next(action);
}
