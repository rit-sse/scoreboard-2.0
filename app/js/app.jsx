import React from 'react';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './store';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory' ;

const history = createBrowserHistory();

window.onload = () =>  {
  gapi.load('auth2', () => {
    React.render(
      <Provider store={store}>
        {() => <Router history={history}>{routes}</Router>}
      </Provider>,
      document.getElementById('app')
    );
  });
};
