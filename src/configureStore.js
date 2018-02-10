import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import reducer from './reducers/';
import { loadState, saveState } from './LocalStorage';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  store.subscribe(throttle(() => {
    saveState(store.getState())
  }, 1000));

  return store;
}

export default configureStore;
