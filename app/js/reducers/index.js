'use strict';
import { combineReducers } from 'redux';
import signedIn from './auth';

export default combineReducers({
  signedIn,
  status,
});
