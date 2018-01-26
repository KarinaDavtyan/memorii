const defaultAuthState = {
  token: null,
  user: null,
}

const auth = (state = defaultAuthState, action) => {
  switch (action.type) {
  case 'SET_AUTHORIZATION':
    return {
      token: action.data.token,
      user: action.data.user.username
    }
    break;
  case 'CLEAR_AUTHORIZATION':
    return {
      token: null,
      user: null
    }
    break;
  }

  return state;
}

export default auth;
