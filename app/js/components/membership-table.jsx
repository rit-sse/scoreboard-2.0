'use strict';

import React from 'react';
import { getMemberships, sortMemberships } from '../actions/memberships';
import { connect } from 'react-redux';
import moment from 'moment';

export default class MembershipTable extends React.Component {
  constructor() {
    super();

    this.display = this.display.bind(this);
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
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th onClick={this.props.sort.bind(this, ['startDate'])}>Date Earned {this.display('startDate')}</th>
              <th onClick={this.props.sort.bind(this, ['userDce'])}>DCE {this.display('userDce')}</th>
              <th onClick={this.props.sort.bind(this, ['member', 'firstName'])}>First Name {this.display('member', 'firstName')}</th>
              <th onClick={this.props.sort.bind(this, ['member', 'lastName'])}>Last Name {this.display('member', 'lastName')}</th>
              <th onClick={this.props.sort.bind(this, ['committeeName'])}>Committee {this.display('committeeName')}</th>
              <th onClick={this.props.sort.bind(this, ['reason'])}>Reason {this.display('reason')}</th>
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
    );
  }
}
