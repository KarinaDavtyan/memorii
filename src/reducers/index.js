import { combineReducers } from 'redux';

import auth from './auth';
import notification from './notification';
import selections from './selections';


const appReducers = combineReducers({
  auth,
  notification,
  selections
})

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_AUTHORIZATION') {
    state = undefined
  }
  return appReducers(state, action)
}

export default rootReducer;
