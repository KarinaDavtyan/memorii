import { combineReducers } from 'redux';

import auth from './auth';
import notification from './notification';

const reducers = combineReducers({
  auth,
  notification
})

export default reducers;
