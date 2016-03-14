import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} from '../actions/auth';

import { GET_COMMITTEES_FAILURE } from '../actions/committees';
import {
  GET_MEMBERSHIPS_FAILURE,
  APPROVE_MEMBERSHIP_FAILURE,
  ADD_MEMBERSHIP_FAILURE,
} from '../actions/memberships';
import { GET_MEMBERS_FAILURE } from '../actions/members';

export default function status(state = { err: null, notice: null }, action) {
  switch (action.type) {
  case SIGN_IN_SUCCESS:
    return Object.assign({}, state, {
      err: null,
      notice: { message: 'Signed In Successfully!' },
    });
  case SIGN_OUT_SUCCESS:
    return Object.assign({}, state, {
      err: null,
      notice: { message: 'Signed Out Successfully!' },
    });
  case SIGN_OUT_FAILURE:
  case SIGN_IN_FAILURE:
  case GET_COMMITTEES_FAILURE:
  case GET_MEMBERSHIPS_FAILURE:
  case APPROVE_MEMBERSHIP_FAILURE:
  case ADD_MEMBERSHIP_FAILURE:
  case GET_MEMBERS_FAILURE:
    return Object.assign({}, state, {
      err: action.error,
      notice: null,
    });
  default:
    return state;
  }
}
