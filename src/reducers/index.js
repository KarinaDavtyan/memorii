const defaultAuthState = {
  token: null,
  user: null,
}

const auth = (state = defaultAuthState, action) => {
  switch (action.type) {
  case 'SET_AUTHORIZATION':
    return action.data
    break;
  }
  return state;
}

export default auth;
