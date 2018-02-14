import { CALL_API } from '../middlewares/api';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const createUser = (data) => ({
  [CALL_API] : {
    types: [CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE],
    endpoint: '/new-user',
    method: 'POST',
    body: data
  }
})

export const GET_USER_SESSION_REQUEST = 'GET_USER_SESSION_REQUEST';
export const GET_USER_SESSION_SUCCESS = 'GET_USER_SESSION_SUCCESS';
export const GET_USER_SESSION_FAILURE = 'GET_USER_SESSION_FAILURE';

export const getUserSession = (username, password) => ({
  [CALL_API] : {
    types: [GET_USER_SESSION_REQUEST, GET_USER_SESSION_SUCCESS, GET_USER_SESSION_FAILURE],
    endpoint: '/sign-in',
    encoded: btoa(`${username}:${password}`)
  }
})

export const GET_SELECTIONS_REQUEST = 'GET_SELECTIONS_REQUEST';
export const GET_SELECTIONS_SUCCESS = 'GET_SELECTIONS_SUCCESS';
export const GET_SELECTIONS_FAILURE = 'GET_SELECTIONS_FAILURE';

export const getAllSelections = () => ({
  [CALL_API] : {
    types: [GET_SELECTIONS_REQUEST, GET_SELECTIONS_SUCCESS, GET_SELECTIONS_FAILURE],
    endpoint: '/all-selections'
    // schema: Schemas.SELECTIONS
  }
})

export const POST_SELECTION_REQUEST = 'POST_SELECTION_REQUEST';
export const POST_SELECTION_SUCCESS = 'POST_SELECTION_SUCCESS';
export const POST_SELECTION_FAILURE = 'POST_SELECTION_FAILURE';

export const postSelection = (data) => ({
  [CALL_API] : {
    types: [POST_SELECTION_REQUEST, POST_SELECTION_SUCCESS, POST_SELECTION_FAILURE],
    endpoint: '/selection',
    method: 'POST',
    body: data
  }
})

export const DELETE_SELECTION_REQUEST = 'DELETE_SELECTION_REQUEST';
export const DELETE_SELECTION_SUCCESS = 'DELETE_SELECTION_SUCCESS';
export const DELETE_SELECTION_FAILURE = 'DELETE_SELECTION_FAILURE';

export const deleteSelection = (data) => ({
  [CALL_API] : {
    types: [DELETE_SELECTION_REQUEST, DELETE_SELECTION_SUCCESS, POST_SELECTION_FAILURE],
    endpoint: '/selection',
    method: 'DELETE',
    body: data
  }
})

export const GET_WORDS_REQUEST = 'GET_WORDS_REQUEST';
export const GET_WORDS_SUCCESS = 'GET_WORDS_SUCCESS';
export const GET_WORDS_FAILURE = 'GET_WORDS_FAILURE';

export const getWords = (selection) => ({
  [CALL_API] : {
    types: [GET_WORDS_REQUEST, GET_WORDS_SUCCESS, GET_WORDS_FAILURE],
    endpoint: '/selection',
    path: `/${selection}`
  }
})

export const POST_WORDS_REQUEST = 'POST_WORDS_REQUEST';
export const POST_WORDS_SUCCESS = 'POST_WORDS_SUCCESS';
export const POST_WORDS_FAILURE = 'POST_WORDS_FAILURE';

export const postWords = (data) => ({
  [CALL_API] : {
    types: [POST_WORDS_REQUEST, POST_WORDS_SUCCESS, POST_WORDS_FAILURE],
    endpoint: '/words',
    method: 'POST',
    body: data
  }
})

export const DELETE_WORDS_REQUEST = 'DELETE_WORDS_REQUEST';
export const DELETE_WORDS_SUCCESS = 'DELETE_WORDS_SUCCESS';
export const DELETE_WORDS_FAILURE = 'DELETE_WORDS_FAILURE';

export const deleteWords = (data) => ({
  [CALL_API] : {
    types: [DELETE_WORDS_REQUEST, DELETE_WORDS_SUCCESS, POST_WORDS_FAILURE],
    endpoint: '/words',
    method: 'DELETE',
    body: data
  }
})

export const showNotification = (msg) => ({
  type: 'SHOW_NOTIFICATION',
  msg
})

export const GET_CURRENT_SELECTION = 'GET_CURRENT_SELECTION';
export const getCurrentSelection = (title) => ({
  type: 'GET_CURRENT_SELECTION',
  title
})

export const setAuthorization = (data) => ({
  type: 'SET_AUTHORIZATION',
  data
})

export const  clearAuthorization = () => ({
  type: 'CLEAR_AUTHORIZATION',
})
