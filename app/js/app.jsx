'use strict';

import React from 'react';
import AltContainer from 'alt/AltContainer';
import routes from './routes';
import SSEStore from './stores/sse';
import SelectActions from './actions/select';

window.onload = () =>  {
  gapi.load('auth2', () => {
    Router.run(routes, (Handler, state) => {
      SelectActions.changeRoute(state);
      React.render(
        <AltContainer
          store={SSEStore}
          component={Handler}
          actions={SelectActions}
        />, document.getElementById('app')
      );
    });
  });
};
