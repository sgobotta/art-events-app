import { all, call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from '../constants/auth'
import { deleteItemFromStore, setItemToStore } from '../../lib/storage'

export function* logIn({ payload }) {
  try {
    // Turns on Loading indicator
    // yield put(showLoading())

    // Stores the token in the AsyncStorage
    const { token } = payload
    const args = ['facebookToken', token]
    yield call(setItemToStore, ...args)
    // Calls the success action
    yield put({
      type: ActionTypes.AUTH_LOGIN_SUCCESS,
      payload: { facebookToken: token },
    })
  }
  catch (err) {
    // Calls the failure action
    yield put({
      type: ActionTypes.AUTH_LOGIN_FAILURE,
      payload: err,
    });
  }
  finally {
    // Turns off Loading indicator
    // yield put(hideLoading())
  }
}

export function* logOut({ payload }) {
  try {
    const args = ['facebookToken']
    yield call(deleteItemFromStore, ...args)

    yield put({
      type: ActionTypes.AUTH_LOGOUT_SUCCESS
    })
  }
  catch (err) {
    yield put({
      type: ActionTypes.AUTH_LOGOUT_FAILURE,
      payload: err,
    })
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.AUTH_LOGIN_REQUEST, logIn),
    takeLatest(ActionTypes.AUTH_LOGOUT_REQUEST, logOut),
  ])
}
