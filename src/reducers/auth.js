const defaultState = {
  token: null,
  user: null,
  readyToLogin: false
}

const auth = (state = defaultState, action) => {

  switch (action.type) {
  case 'GET_USER_SESSION_SUCCESS':
    return {
      token: action.response.token,
      user: action.response.user.username
    }
  case 'CREATE_USER_SUCCESS':
    return {
      ...state,
      readyToLogin: !this.state.readyToLogin
    }
  default:
    return state;
  }
}

export default auth;
