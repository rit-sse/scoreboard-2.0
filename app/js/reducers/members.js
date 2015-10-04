'use strict';

import {
  GET_MEMBERS_SUCCESS,
} from '../actions/members';

export default function memberships(state=[], action) {
  switch (action.type) {
  case GET_MEMBERS_SUCCESS:
    return action.members;
  default:
    return state;
  }
}
