'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/app';
import Home from './containers/home';
import Memberships from './containers/memberships';
import Member from './containers/member';

export default (
  <Route component={App} path='/scoreboard'>
    <IndexRoute component={Home} />
    <Route path='/scoreboard/memberships' component={Memberships} />
    <Route path='/scoreboard/members/:dce' component={Member} />
  </Route>
);
