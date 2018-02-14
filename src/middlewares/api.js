import { normalize, schema } from 'normalizr';
import { checkStatus } from '../helpers';

const API_ROOT = 'http://localhost:3000';

const callApi = (endpoint, token, body, method = 'GET', path, encoded) => {
  let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  if (path) fullUrl =  fullUrl + encodeURI(path);
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (encoded) headers.Authorization = `Basic ${encoded}`
  headers['Content-Type'] = 'application/json';
  return fetch(fullUrl, {
    method,
    headers,
    body
  })
    .then(checkStatus)
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

  let { endpoint, method, path, encoded } = callAPI;
  const { schema, types } = callAPI;

  let body;
  if (callAPI.body) body = JSON.stringify(callAPI.body);

  if (typeof endpoint !== 'string') throw new Error('Specify a string endpoint URL.')
  // if (!schema) throw new Error('Specify one of the exported Schemas.');
  if (!Array.isArray(types) || types.length !== 3) throw new Error('Expected an array of three action types.')
  if (!types.every(type => typeof type === 'string')) throw new Error('Expected action types to be strings.')
  let token = store.getState().auth.token;

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, token, body, method, path, encoded)
    .then(response => {
      next(actionWith({
        response,
        type: successType
      }))
    })
    .catch((error) => {
      next(actionWith({
        type: failureType,
        msg: error.statusText,
        error: error.status
      }))
    })

}
