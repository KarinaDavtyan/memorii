import { CALL_API } from '../middlewares/api';

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
