export const showNotification = (notificationMessage) => ({
  type: 'SHOW_NOTIFICATION',
  notificationMessage
})

export const getSelections = (list) => ({
  type: 'GET_SELECTIONS',
  list
})

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
