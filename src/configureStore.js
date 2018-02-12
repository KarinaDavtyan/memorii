import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import logger from './middlewares/logger';
import promise from './middlewares/promise';
import reducer from './reducers/';
import { loadState, saveState } from './LocalStorage';

const configureStore = () => {
  const middlewares = [promise, thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const persistedState = loadState();
  const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(throttle(() => {
    saveState(store.getState())
  }, 1000));

  return store;
}

export default configureStore;
