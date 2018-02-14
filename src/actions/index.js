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
