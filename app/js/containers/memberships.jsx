'use strict';

import React from 'react';
import { getMemberships, sortMemberships } from '../actions/memberships';
import { connect } from 'react-redux';
import moment from 'moment';

function mapStateToProps(state) {
  return {
    memberships: state.memberships,
  };
}

class Memberships extends React.Component {
  constructor() {
    super();

    this.sort= this.sort.bind(this);
    this.display = this.display.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getMemberships());
  }

  sort(args) {
    if (JSON.stringify(args) === JSON.stringify(this.props.memberships.fields)) {
      this.props.dispatch(sortMemberships(args, !this.props.memberships.ascending));
    } else {
      this.props.dispatch(sortMemberships(args, true));
    }
  }

  display(...args) {
    const icon = this.props.memberships.ascending ? 'up' : 'down';
    if (JSON.stringify(args) === JSON.stringify(this.props.memberships.fields)) {
      return <i className={`fa fa-caret-${icon}`} />;
    }
    return <span />;
  }

  render() {

    return (
      <div>
        <h2 className='text-center'>Memberships</h2>
        <button className='btn btn-primary pull-right'>
          <i className='fa fa-download' />
          Export
        </button>

        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th onClick={this.sort.bind(this, ['startDate'])}>Date Earned {this.display('startDate')}</th>
              <th onClick={this.sort.bind(this, ['userDce'])}>DCE {this.display('userDce')}</th>
              <th onClick={this.sort.bind(this, ['member', 'firstName'])}>First Name {this.display('member', 'firstName')}</th>
              <th onClick={this.sort.bind(this, ['member', 'lastName'])}>Last Name {this.display('member', 'lastName')}</th>
              <th onClick={this.sort.bind(this, ['committeeName'])}>Committee {this.display('committeeName')}</th>
              <th onClick={this.sort.bind(this, ['reason'])}>Reason {this.display('reason')}</th>
            </tr>
          </thead>
          <tbody>
            {this.props.memberships.list.map( membership => {
              return(
                <tr>
                  <td>{moment(membership.startDate).format('MM/DD/YYYY')}</td>
                  <td>{membership.userDce}</td>
                  <td></td>
                  <td></td>
                  <td>{membership.committeeName}</td>
                  <td>{membership.reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    );
  }
}

export default connect(mapStateToProps)(Memberships);
