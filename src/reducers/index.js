import { combineReducers } from 'redux';

import auth from './auth';
import notification from './notification';
import selections from './selections';
import selectionsAPI from './selectionsAPI';


const appReducers = combineReducers({
  auth,
  notification,
  selections,
  selectionsAPI
})

const rootReducer = (state, action) => {
  console.log(action.type);
  if (action.type === 'CLEAR_AUTHORIZATION') {
    state = undefined
  }
  return appReducers(state, action)
}

export default rootReducer;
