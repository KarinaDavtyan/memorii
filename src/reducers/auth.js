const defaultState = {
  token: null,
  user: null,
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
  case 'SET_AUTHORIZATION':
    return {
      token: action.data.token,
      user: action.data.user.username
    }
  case 'CLEAR_AUTHORIZATION':
    return {
      token: null,
      user: null
    }
  default:
    return state;
  }
}

export default auth;
