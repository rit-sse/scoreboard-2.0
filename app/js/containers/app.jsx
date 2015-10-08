'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LogIn from '../components/log-in';
import { signOut } from '../actions/auth';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    status: state.status,
  };
}

class ScoreboardApp extends React.Component {
  constructor() {
    super();

    this.renderPrimary = this.renderPrimary.bind(this);
    this.renderLogIn = this.renderLogIn.bind(this);
  }

  renderLogIn() {
    if (!this.props.auth.signedIn) {
      return (
        <li>
          <LogIn key='login' dispatch={this.props.dispatch} />
        </li>
      );
    }
    return (
      <li>
        <button
          id='sign-out'
          key='logout'
          className='btn'
          onClick={() => this.props.dispatch(signOut())}
        >
          Sign Out
        </button>
      </li>
    );
  }

  renderPrimary() {
    if (this.props.auth.primary) {
      return (
        <li>
          <Link to='/scoreboard/approve'>Approve</Link>
        </li>
      );
    }

    return <li><span/></li>;
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
            </h1>
            <ul className='list-inline bottom-align hidden-xs'>
              <li>
                <Link to='/scoreboard/memberships'>Memberships</Link>
              </li>
              {this.renderPrimary()}
              {this.renderLogIn()}
            </ul>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ScoreboardApp);
