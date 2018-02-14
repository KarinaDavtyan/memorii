import * as typeAction from '../actions'

export default (store) => (next) => (action) => {
  if (action.error && action.error === 401) {
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
