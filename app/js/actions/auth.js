import api from '../api';

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

function signInSuccess(officer) {
  return {
    type: SIGN_IN_SUCCESS,
    officer,
  };
}

function signInFailed(error) {
  return {
    type: SIGN_IN_FAILURE,
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
    return Promise.all([info, api.Officers.all({ active: new Date() }, true)])
      .then(data => {
        const officers = data[1];
        const oIndex = officers.map(o => o.userDce).indexOf(data[0].id);
        if (oIndex !== -1) {
          return Promise.all([
            api.Auth.getToken('google', data[0].id,  data[0].token),
            officers[oIndex],
          ]);
        }
        return Promise.reject({ message: 'Need to be an officer to log in' });
      })
      .then(p => dispatch(signInSuccess(p[1])))
      .catch(error => dispatch(signInFailed(error)));
  };
}

export function checkLogin() {
  return dispatch => {
    return api.Auth.checkToken().then(user => {
      return api.Officers.all({ active: new Date() }, true).then(data => {
        const oIndex = data.map(o => o.userDce).indexOf(user.dce);
        if (oIndex !== -1) {
          return Promise.resolve(data[oIndex]);
        }
        return Promise.reject({ message: 'Need to be an officer to log in' });
      });
    })
    .then(p => dispatch(signInSuccess(p)))
    .catch(() => dispatch(signOutSuccess()));
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
