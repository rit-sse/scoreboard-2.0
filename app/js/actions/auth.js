'use strict';

import api from '../api';

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

function signInSuccess() {
  return {
    type: SIGN_IN_SUCCESS,
  };
}

function signInFailed(error) {
  return {
    type: SIGN_IN_SUCCESS,
    error,
  };
}

function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS,
  };
}

function signOutFailed(error) {
  return {
    type: SIGN_OUT_FAILURE,
    error,
  };
}

export function signIn(googleUser) {
  return dispatch => {
    const info = {
      token: googleUser.getAuthResponse().id_token,
      id: googleUser.getBasicProfile().getEmail().split('@')[0],
    };
    return Promise.all([info, api.Officers.all({ active: true })])
      .then(data => {
        const officers = data[1];
        if (officers.data.map(o => o.userDce).indexOf(data[0].id) !== -1) {
          return api.Auth.getToken('google', data[0].id,  data[0].token);
        }
        return Promise.reject({ message: 'Need to be an officer to log in' });
      })
      .then(() => dispatch(signInSuccess()))
      .catch(error => dispatch(signInFailed(error)));
  };
}


export function signOut() {
  return dispatch => {
    return Promise
      .all([api.Auth.signOut(), gapi.auth2.getAuthInstance().signOut()])
      .then(() => dispatch(signOutSuccess()))
      .catch(error => dispatch(signOutFailed(error)));
  };
}
