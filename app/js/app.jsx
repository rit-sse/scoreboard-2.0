'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './store';

window.onload = () =>  {
  gapi.load('auth2', () => {
    Router.run(routes, Router.HistoryLocation, (Handler, routerState) => {
      React.render(
        <Provider store={store}>
          {() => <Handler routerState={routerState} />}
        </Provider>,
        document.getElementById('app')
      );
    });
  });
};
