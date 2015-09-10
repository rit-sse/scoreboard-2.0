'use strict';

import alt from '../alt';
import AuthActions from '../actions/auth';
import AuthSource from '../sources/auth';
import CommitteesActions from '../actions/committees';
import CommitteesSource from '../sources/committees';
import SelectActions from '../actions/select';
import querystring from 'querystring';

class SSEStore {
  constructor() {
    this.loggedIn = false;
    this.err = null;
    this.committees = { data: [] };
    this.filters = querystring.parse(location.search.replace('?', ''));
    this.status = null;

    this.registerAsync(AuthSource);
    this.registerAsync(CommitteesSource);

    this.bindActions(AuthActions);
    this.bindActions(CommitteesActions);
    this.bindActions(SelectActions);
  }

  setError(err) {
    if ( err.message === 'Unauthorized' ) {
      this.err = { message: 'Token expired. Try logging in again.' };
      this.loggedIn = false;
    } else {
      this.err = err;
    }
    this.status = null;
  }

  setStatus(status) {
    this.err = null;
    this.status = status;
  }

  onSignInSuccess() {
    this.setStatus({ message: 'Signed in successfully' });
    this.loggedIn = true;
  }

  onSignInFailed(err) {
    this.setError(err);
    this.loggedIn = false;
  }

  onSignOutSuccess() {
    this.setStatus({ message: 'Signed out successfully' });
    this.loggedIn = false;
  }

  onGetCommitteesSuccess(payload) {
    this.committees = payload;
    this.status = null;
    this.err = null;
  }

  onGetCommitteesFailed(err) {
    this.setError(err);
  }

  onSetPage(page) {
    this.filters.page = page;
  }

}

export default alt.createStore(SSEStore, 'SSEStore');
