'use strict';

import React from 'react';
import { getMemberships, sortMemberships } from '../actions/memberships';
import { connect } from 'react-redux';
import MembershipTable from '../components/membership-table';

function mapStateToProps(state) {
  return {
    memberships: state.memberships,
  };
}

class Memberships extends React.Component {
  constructor() {
    super();

    this.sort= this.sort.bind(this);
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

  render() {

    return (
      <div>
        <h2 className='text-center'>Memberships</h2>
        <button className='btn btn-primary pull-right'>
          <i className='fa fa-download' />
          Export
        </button>

        <MembershipTable
          memberships={this.props.memberships}
          sort={this.sort}
          dispatch={this.props.dispatch}
        />

      </div>
    );
  }
}

export default connect(mapStateToProps)(Memberships);
