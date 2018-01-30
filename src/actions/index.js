export const showNotification = (notificationMessage) => ({
  type: 'SHOW_NOTIFICATION',
  notificationMessage
})

export const selectionsChange = () => ({
  type: 'TOGGLE_FETCH_SELECTIONS'
})
