'use strict';

import React from 'react';
import AltContainer from 'alt/AltContainer';
import ScoreboardApp from './components/app';
import SSEStore from './stores/sse';
import SelectActions from './actions/select';

window.onload = () =>  {
  gapi.load('auth2', () => {
    React.render(
      <AltContainer
        store={SSEStore}
        component={ScoreboardApp}
        actions={SelectActions}
      />, document.getElementById('app'));
  });
};
