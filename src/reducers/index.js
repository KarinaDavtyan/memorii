import { combineReducers } from 'redux';

import auth from './auth';
import notification from './notification';
import selections from './selections';


const reducers = combineReducers({
  auth,
  notification,
  selections
})

export default reducers;
