export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("ERROR IS ", e);
    return;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error("ERROR IS ", e);
  }
}
