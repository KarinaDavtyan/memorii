const defaultState = {
  selectionsChange: false
}

const selection = (state = defaultState, action) => {
  switch (action.type) {
  case 'TOGGLE_FETCH_SELECTIONS':
    return {
      ...state,
      selectionsChange: !state.selectionsChange
    };
    break;
  }

  return state;
}

export default selection;
