'use strict';

import api from '../api';

export const GET_COMMITTEES_SUCCESS = 'GET_COMMITTEES_SUCCESS';
export const GET_COMMITTEES_FAILURE = 'GET_COMMITTEES_FAILURE';

function getCommitteesSuccess(committees) {
  return {
    type: GET_COMMITTEES_SUCCESS,
    committees,
  };
}

function getCommitteesFailed(error) {
  return {
    type: GET_COMMITTEES_FAILURE,
    error,
  };
}

export function getCommittees() {
  return dispatch => {
    return api.Committees.all({ /*active: new Date()*/ }, true)
      .then(body => dispatch(getCommitteesSuccess(body)))
      .catch(error => dispatch(getCommitteesFailed(error)));
  };
}
