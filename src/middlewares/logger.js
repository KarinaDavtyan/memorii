export default (store) => (next) => (action) => {
  if (action.type) {
    console.log(`%c ${action.type} `, 'background: #FFDEFF; color: #000071');
    if (action.fullError) console.log(action.fullError);
    return next(action)
  }
}
