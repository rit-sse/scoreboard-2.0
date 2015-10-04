'use strict';

import {
  GET_MEMBERSHIPS_SUCCESS,
} from '../actions/memberships';

export default function memberships(state=[], action) {
  switch (action.type) {
  case GET_MEMBERSHIPS_SUCCESS:
    return action.memberships;
  default:
    return state;
  }
}
