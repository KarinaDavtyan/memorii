export default (store) => (next) => (action) => {
  if (action.error && action.error === 401) {
    store.dispatch({
      type: 'CLEAR_AUTHORIZATION'
    })
  }

  if (action.type === 'CHECK_USERNAME_SUCCESS') {
    store.dispatch({
      type: 'SHOW_NOTIFICATION',
      msg: 'Sorry username already taken'
    })
  }

  if (action.type !== 'GET_USER_SESSION_FAILURE' && action.error && action.error === 404) {
    store.dispatch({
      type: 'SHOW_NOTIFICATION',
      msg: 'No content yet'
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
