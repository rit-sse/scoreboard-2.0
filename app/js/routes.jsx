'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/home';
import Memberships from './components/memberships';
import Member from './components/member';

export default (
  <Route component={App} path='/scoreboard'>
    <IndexRoute component={Home} />
    <Route path='/scoreboard/memberships' component={Memberships} />
    <Route path='/scoreboard/members/:dce' component={Member} />
  </Route>
);
