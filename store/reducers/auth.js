import immutable from 'immutability-helper';
import { createReducer } from '../lib/helpers';
import ActionTypes from '../constants/auth';

export const authState = {
  isAuthenticated: false,
  status: 'idle',
  data: {
    facebookToken: '',
  },
};

export default {
  auth: createReducer(authState, {
    [ActionTypes.AUTH_LOGIN_REQUEST](state) {
      return immutable(state, {
        status: { $set: 'running' },
      });
    },
    [ActionTypes.AUTH_LOGIN_SUCCESS](state, { payload }) {
      return immutable(state, {
        isAuthenticated: { $set: true },
        status: { $set: 'idle' },
        data: { $set: { facebookToken: payload.facebookToken } },
      });
    },
    [ActionTypes.AUTH_LOGIN_FAILURE](state) {
      return immutable(state, {
        isAuthenticated: { $set: false },
        status: { $set: 'idle' },
      });
    },
    [ActionTypes.AUTH_LOGOUT_REQUEST](state) {
      return immutable(state, {
        status: { $set: 'running' },
        data: { $set: { facebookToken: '' } },
      });
    },
    [ActionTypes.AUTH_LOGOUT_SUCCESS](state) {
      return immutable(state, {
        isAuthenticated: { $set: false },
        status: { $set: 'idle' },
      });
    },
    [ActionTypes.AUTH_LOGOUT_FAILURE](state) {
      return immutable(state, {
        isAuthenticated: { $set: false },
        status: { $set: 'idle' },
      });
    },
  }),
};
