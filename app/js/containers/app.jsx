import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import LogIn from '../components/log-in';
import { signOut, checkLogin } from '../actions/auth';
import AddModal from '../components/add-modal';
import { addMembership } from '../actions/memberships';
import { getCommittees } from '../actions/committees';
import API from '../api';

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
    this.saveAs = this.saveAs.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getCommittees());
    this.props.dispatch(checkLogin());
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

  downloadFile() {
    API
      .Memberships
      .all({ active: new Date() }, true)
      .then(body => {
        return body.reduce( (a, m) => {
          if (a.indexOf(m.userDce) < 0) {
            a.push(m.userDce);
          }
          return a;
        }, []);
      })
      .then( members => {
        this.saveAs(members.join('\n'), 'memberships.csv');
      });
  }

  saveAs(contents, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contents));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  renderDownload() {
    if (this.props.auth.signedIn) {
      return (
        <li>
          <button className='btn btn-link' onClick={this.downloadFile}>Download list of members</button>
        </li>
      );
    }
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
              {this.renderDownload()}
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
