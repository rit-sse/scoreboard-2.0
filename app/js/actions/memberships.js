import api from '../api';

export const GET_MEMBERSHIPS_SUCCESS = 'GET_MEMBERSHIPS_SUCCESS';
export const GET_MEMBERSHIPS_FAILURE = 'GET_MEMBERSHIPS_FAILURE';
export const APPROVE_MEMBERSHIP_SUCCESS = 'APPROVE_MEMBERSHIP_SUCCESS';
export const APPROVE_MEMBERSHIP_FAILURE = 'APPROVE_MEMBERSHIP_FAILURE';
export const ADD_MEMBERSHIP_SUCCESS = 'ADD_MEMBERSHIP_SUCCESS';
export const ADD_MEMBERSHIP_FAILURE = 'ADD_MEMBERSHIP_FAILURE';
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

function approveSuccess(index) {
  return {
    type: APPROVE_MEMBERSHIP_SUCCESS,
    index,
  };
}

function approveFailure(error) {
  return {
    type: APPROVE_MEMBERSHIP_FAILURE,
    error,
  };
}

function addSuccess(membership) {
  return {
    type: ADD_MEMBERSHIP_SUCCESS,
    membership,
  };
}

function addFailure(error) {
  return {
    type: ADD_MEMBERSHIP_FAILURE,
    error,
  };
}

export function getMemberships(active, page, approved=true) {
  return dispatch => {
    return api.Memberships.all({ active, page, approved })
      .then(body => {
        body.data = body.data.map(element => {
          element.startDate = new Date(element.startDate);
          return element;
        });
        return body;
      })
      .then(data => dispatch(getMembershipsSuccess(data, approved)))
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

export function approveMembership(membership, index, approved) {
  return dispatch => {
    return api.Memberships.update(membership.id, { approved })
      .then(() => dispatch(approveSuccess(index)))
      .catch(error => dispatch(approveFailure(error)));
  };
}

export function addMembership(membership) {
  return dispatch => {
    return api.Memberships.create(membership)
      .then(m => dispatch(addSuccess(m)))
      .catch(error => dispatch(addFailure(error)));
  };
}
