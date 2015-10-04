'use strict';

import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from '../actions/auth';

export default function auth(state = { }, action) {
  switch (action.type) {
  case SIGN_IN_SUCCESS:
    return { signedIn: true, primary: action.officer.primary };
  case SIGN_OUT_SUCCESS:
    return { signedIn: false };
  default:
    return state;
  }
}
