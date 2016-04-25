import api from '../api';

export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE';

function getMembersSuccess(members) {
  return {
    type: GET_MEMBERS_SUCCESS,
    members,
  };
}

function saveAs(contents, filename) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contents));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function downloadMembers() {
  api.Memberships
    .all({ active: new Date() }, true)
    .then(body => {
      return body.reduce( (a, m) => {
        if (a.indexOf(m.userDce) < 0) {
          a.push(m.userDce);
        }
        return a;
      }, []);
    })
    .then( members => {
      saveAs(members.join('\n'), 'memberships.csv');
    });
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
