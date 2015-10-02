'use strict';

import { Route, DefaultRoute } from 'react-router';

export default (
  <Route handler={App} path='/'>
    <Route name='home' path='/' handler={Home} />
    <Route name='memberships' path='/memberships' handler={Memberships} />
    <Route name='member' path='/:dce' handler={RecentUsers} />
  </Route>
);
