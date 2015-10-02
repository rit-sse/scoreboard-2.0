'use strict';
import { combineReducers } from 'redux';
import auth from './auth';
import status from './status';
import committees from './committees';
import memberships from './memberships';
import members from './members';

export default combineReducers({
  auth,
  status,
  committees,
  memberships,
  members,
});
