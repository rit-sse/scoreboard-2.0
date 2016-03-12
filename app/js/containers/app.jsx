import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LogIn from '../components/log-in';
import { signOut } from '../actions/auth';
import AddModal from '../components/add-modal';
import { addMembership } from '../actions/memberships';
import { getCommittees } from '../actions/committees';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    status: state.status,
    committees: state.committees,
  };
}

class ScoreboardApp extends React.Component {
  constructor() {
    super();

    this.state = { showAdd: false };

    this.renderPrimary = this.renderPrimary.bind(this);
    this.renderLogIn = this.renderLogIn.bind(this);
    this.renderAdd = this.renderAdd.bind(this);
    this.showAdd = this.showAdd.bind(this);
    this.hideAdd = this.hideAdd.bind(this);
    this.addMembership = this.addMembership.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getCommittees());
  }

  showAdd() {
    this.setState({ showAdd: true });
  }


  hideAdd() {
    this.setState({ showAdd: false });
  }

  addMembership(membership) {
    this.props.dispatch(addMembership(membership));
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
          <Link to='/scoreboard/memberships/approve'>Approve</Link>
        </li>
      );
    }

    return <li><span/></li>;
  }

  renderAdd() {
    if (this.props.auth.signedIn) {
      return (
        <li>
          <button className='btn btn-link' onClick={this.showAdd}>Add Membership  </button>
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
              {this.renderAdd()}
              {this.renderPrimary()}
              {this.renderLogIn()}
            </ul>
          </div>
        </div>
        <AddModal
          title='Add'
          show={this.state.showAdd}
          close={this.hideAdd}
          submit={this.addMembership}
          committees={this.props.committees}
          membership={{ user: {} }} />
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ScoreboardApp);
