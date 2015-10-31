'use strict';

import {
  GET_MEMBERSHIPS_SUCCESS,
  SORT_MEMBERSHIPS,
  APPROVE_MEMBERSHIP_SUCCESS,
  ADD_MEMBERSHIP_SUCCESS,
} from '../actions/memberships';

function value(obj, keys) {
  return keys.reduce((cur, key) => cur[key], obj);
}

function sort(a, b, keys, ascending) {
  const [aValue, bValue] = [value(a, keys), value(b, keys)];
  if (ascending) {
    if (aValue < bValue) {
      return -1;
    }
    if (aValue > bValue) {
      return 1;
    }
    return 0;
  }
  if (aValue < bValue) {
    return 1;
  }
  if (aValue > bValue) {
    return -1;
  }
  return 0;
}

export default function memberships(state={ list: [], ascending: true, fields: ['startDate'] }, action) {
  switch (action.type) {
  case GET_MEMBERSHIPS_SUCCESS:
    return Object.assign({}, state, {
      list: action.memberships.sort((a, b) => sort(a, b, state.fields, state.ascending) ),
    });
  case SORT_MEMBERSHIPS:
    return Object.assign({}, state, {
      list: state.list.sort((a, b) => sort(a, b, action.fields, action.ascending) ),
      ascending: action.ascending,
      fields: action.fields,
    });
  case ADD_MEMBERSHIP_SUCCESS:
    return Object.assign({}, state, {
      list: state.list.concat([action.membership]).sort((a, b) => sort(a, b, state.fields, state.ascending) ),
    });
  case APPROVE_MEMBERSHIP_SUCCESS:
    return Object.assign({}, state, {
      list: state.list.splice(action.index, 1),
    });
  default:
    return state;
  }
}
