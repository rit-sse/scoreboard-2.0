'use strict';

import api from '../api';

export const GET_MEMBERSHIPS_SUCCESS = 'GET_MEMBERSHIPS_SUCCESS';
export const GET_MEMBERSHIPS_FAILURE = 'GET_MEMBERSHIPS_FAILURE';
export const SORT_MEMBERSHIPS = 'SORT_MEMBERSHIPS';

function getMembershipsSuccess(memberships) {
  return {
    type: GET_MEMBERSHIPS_SUCCESS,
    memberships,
  };
}

function getMembershipsFailure(error) {
  return {
    type: GET_MEMBERSHIPS_FAILURE,
    error,
  };
}

export function getMemberships(active, page) {
  return dispatch => {
    return api.Memberships.all({ active, page })
      .then(body => body.data.map(element => {
        element.startDate = new Date(element.startDate);
        return element;
      }))
      .then(data => dispatch(getMembershipsSuccess(data)))
      .catch(error => dispatch(getMembershipsFailure(error)));
  };
}

export function sortMemberships(fields, ascending) {
  return {
    type: SORT_MEMBERSHIPS,
    ascending,
    fields,
  };
}
