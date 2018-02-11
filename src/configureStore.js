import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import reducer from './reducers/';
import { loadState, saveState } from './LocalStorage';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) return rawDispatch;
  return (action) => {
    console.group(action.type);
    console.group('%c prev state', 'color: gray', store.getState());
    console.group('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.group('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}


const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }

  store.subscribe(throttle(() => {
    saveState(store.getState())
  }, 1000));

  return store;
}

export default configureStore;
