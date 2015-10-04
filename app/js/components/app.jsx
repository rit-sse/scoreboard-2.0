'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class ScoreboardApp extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='container'>
        <div id='header' className='page-header'>
          <div className='flex'>
            <h1 className='text-left'>
              <Link to='/scoreboard' className='no-decoration'>
                Scoreboard
                <small> SSE Membership Tracker</small>
              </Link>
              {this.props.children}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
