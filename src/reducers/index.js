import { combineReducers } from 'redux';

import auth from './auth';
import notification from './notification';
import selection from './selection';


const reducers = combineReducers({
  auth,
  selection,
  notification
})

export default reducers;
