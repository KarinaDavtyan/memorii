export default (store) => (next) => {
  if (!console.group) return next;
  return (action) => {
    if (action.type) {
      console.group(action.type);
      console.group('%c prev state', 'color: gray', store.getState());
      console.group('%c action', 'color: blue', action);
      const returnValue = next(action);
      console.group('%c next state', 'color: green', store.getState());
      console.groupEnd(action.type);
      return returnValue;
    }
  }
}
