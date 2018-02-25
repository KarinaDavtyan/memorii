import * as typeAction from '../actions'

const defaultState = {
  notificationTime: null,
  notificationMessage: '',
}

const notification = (state = defaultState, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
  case typeAction.GET_SELECTIONS_FAILURE:
    return {
      notificationTime: (new Date()).getTime() + 5000,
      notificationMessage: action.msg,
    }
  default:
    return state;
  }
};

export default notification;
