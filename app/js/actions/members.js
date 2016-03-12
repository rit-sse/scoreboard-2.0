import api from '../api';

export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE';

function getMembersSuccess(members) {
  return {
    type: GET_MEMBERS_SUCCESS,
    members,
  };
}

function getMembersFailure(error) {
  return {
    type: GET_MEMBERS_FAILURE,
    error,
  };
}

export function getMembers(active) {
  return dispatch => {
    return api.Memberships.all({ active }, true)
      .then(body => {
        return body.reduce((members, membership) => {
          members[membership.userDce] = members[membership.userDce] || [0, `${membership.user.firstName} ${membership.user.lastName}`];
          members[membership.userDce][0]++;
          return members;
        }, {});
      })
      .then(members => dispatch(getMembersSuccess(members)))
      .catch(error => dispatch(getMembersFailure(error)));
  };
}
