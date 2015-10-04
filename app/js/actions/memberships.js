'use strict';

import api from '../api';

export const GET_MEMBERSHIPS_SUCCESS = 'GET_MEMBERSHIPS_SUCCESS';
export const GET_MEMBERSHIPS_FAILURE = 'GET_MEMBERSHIPS_FAILURE';

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
      .then(body => dispatch(getMembershipsSuccess(body.data)))
      .catch(error => dispatch(getMembershipsFailure(error)));
  };
}
