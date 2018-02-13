import { normalize, schema } from 'normalizr'

const API_ROOT = 'http://localhost:3000';

const callApi = (endpoint, token, method = 'GET') => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  headers['Content-Type'] = 'application/json';
  console.log({method}, {headers}, fullUrl);
  return fetch(fullUrl, {
    method,
    headers
  })
    .then(response => response.json())
    .then(data => data);
}

// const selectionSchema = new schema.Entity('selections');
// const selectionSchemaArray = new schema.Array({
//   selections: selectionSchema
// }, (input, parent, key) => `${input.type}s`);
//
// const myArray = new schema.Array({
//   admins: adminSchema,
//   users: userSchema
// }, (input, parent, key) => `${input.type}s`);
//
// export const Schemas = {
//   SELECTIONS: [selectionSchema],
// }

export const CALL_API = 'Call API'


export default (store) => (next) => (action) => {

  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') return next(action)

  let { endpoint } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint !== 'string') throw new Error('Specify a string endpoint URL.')
  // if (!schema) throw new Error('Specify one of the exported Schemas.');
  if (!Array.isArray(types) || types.length !== 3) throw new Error('Expected an array of three action types.')
  if (!types.every(type => typeof type === 'string')) throw new Error('Expected action types to be strings.')
  let token = store.getState().auth.token;

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    console.log(finalAction, 'finalaction before');
    delete finalAction[CALL_API]
    console.log(finalAction, 'finalAction after');
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  console.log(types, 'types');

  return callApi(endpoint, token)
    .then(response => {
      console.log(response);
      next(actionWith({
        response,
        type: successType
      }))
    })

}
