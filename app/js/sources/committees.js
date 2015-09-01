'use strict';

import api from '../api';
import CommitteesActions from '../actions/committees';

export default {
  getCommittees: {
    remote() {
      return api.Committees.all({ active: true });
    },
    success: CommitteesActions.getCommitteesSuccess,
    error: CommitteesActions.getCommitteesFailed,
  },
};
