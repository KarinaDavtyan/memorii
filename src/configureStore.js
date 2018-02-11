import { createStore, applyMiddleware } from 'redux';
import throttle from 'lodash/throttle';

import reducer from './reducers/';
import { loadState, saveState } from './LocalStorage';

const logger = (store) => (next) => {
  if (!console.group) return next;
  return (action) => {
    console.group(action.type);
    console.group('%c prev state', 'color: gray', store.getState());
    console.group('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.group('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
}

const configureStore = () => {
  const middlewares = [promise];

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
