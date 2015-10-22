'use strict';

import React from 'react';
import { getMemberships, sortMemberships, approveMembership } from '../actions/memberships';
import { connect } from 'react-redux';
import MembershipTable from '../components/membership-table';

function mapStateToProps(state) {
  return {
    memberships: state.memberships,
  };
}

class ApproveMemberships extends React.Component {
  constructor() {
    super();

    this.sort = this.sort.bind(this);
    this.approveHandler = this.approveHandler.bind(this);
  }

  componentDidMount() {
    const { query } = this.props.location;
    this.props.dispatch(getMemberships(query.date || new Date(), query.page || 1, 'null'));
  }

  sort(args) {
    if (JSON.stringify(args) === JSON.stringify(this.props.memberships.fields)) {
      this.props.dispatch(sortMemberships(args, !this.props.memberships.ascending));
    } else {
      this.props.dispatch(sortMemberships(args, true));
    }
  }

  approveHandler(membership, index, approve) {
    this.props.dispatch(approveMembership(membership, index, approve));
  }

  render() {

    return (
      <div>
        <h2 className='text-center'>Approve Memberships</h2>

        <MembershipTable
          memberships={this.props.memberships}
          sort={this.sort}
          approve={this.approveHandler}
          dispatch={this.props.dispatch}
        />

      </div>
    );
  }
}

export default connect(mapStateToProps)(ApproveMemberships);
