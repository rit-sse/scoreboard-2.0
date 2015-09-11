'use strict';

import { Route, DefaultRoute } from 'react-router';

export default (
  <Route handler={App} path='/'>
    <DefaultRoute handler={Home} />
    <Route name='memberships' handler={Memberships} />
    <Route name='member' path='/:dce' handler={RecentUsers} />
  </Route>
);
