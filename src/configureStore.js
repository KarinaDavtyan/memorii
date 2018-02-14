import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import logger from './middlewares/logger';
import api from './middlewares/api';
import responseHandler from './middlewares/responseHandler';
import reducer from './reducers/';
import { loadState, saveState } from './LocalStorage';

const configureStore = () => {
  const middlewares = [thunk, api, responseHandler];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const persistedState = loadState();

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    persistedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  store.subscribe(throttle(() => {
    saveState({
      auth:store.getState().auth,
      selections:store.getState().selections
    })
  }, 1000));

  return store;
}

export default configureStore;
