import ActionTypes from '../constants/auth'

export function logIn(payload: Object): Object {
  return {
    type: ActionTypes.AUTH_LOGIN_REQUEST,
    payload
  }
}

export function logOut(): Object {
  return {
    type: ActionTypes.AUTH_LOGOUT_REQUEST,
    payload: {}
  }
}
