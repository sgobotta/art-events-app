import { all, fork } from 'redux-saga/effects';

import auth from './auth';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(auth),
  ]);
}
