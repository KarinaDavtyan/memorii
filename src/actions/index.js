export const showNotification = (notificationMessage) => ({
  type: 'SHOW_NOTIFICATION',
  notificationMessage
})

export const getSelections = (list) => ({
  type: 'GET_SELECTIONS',
  list
})
