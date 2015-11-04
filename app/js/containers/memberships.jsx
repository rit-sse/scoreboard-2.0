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
    const { query } = this.props.location;
    this.props.dispatch(getMemberships(query.date || new Date(), query.page || 1));
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
        <div className='pull-right'>
          <button className='btn btn-primary'>
            <i className='fa fa-download' />
            Export
          </button>
        </div>
        <MembershipTable
          memberships={this.props.memberships}
          sort={this.sort}
        />

      </div>
    );
  }
}

export default connect(mapStateToProps)(Memberships);
