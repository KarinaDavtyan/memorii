const defaultState = {
  notificationTime: null,
  notificationMessage: '',
}

const notification = (state = defaultState, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return {
      notificationTime: (new Date()).getTime() + 5000,
      notificationMessage: action.msg,
    }
  default:
    return state;
  }
};

export default notification;
