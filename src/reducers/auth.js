const defaultState = {
  token: null,
  user: null,
}

const auth = (state = defaultState, action) => {

  switch (action.type) {
  case 'GET_USER_SESSION_SUCCESS':
    return {
      token: action.response.token,
      user: action.response.user.username
    }
  default:
    return state;
  }
}

export default auth;
