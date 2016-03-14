import React from 'react';
import { getMemberships, sortMemberships, approveMembership } from '../actions/memberships';
import { connect } from 'react-redux';
import MembershipTable from '../components/membership-table';
import Pagination from '../components/pagination';

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

  componentWillReceiveProps(newProps) {
    if (this.props.location.query.page !== newProps.location.query.page) {
      const { query } = newProps.location;
      this.props.dispatch(getMemberships(query.date || new Date(), query.page || 1, 'null'));
    }
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

        <div className='text-center'>
          <Pagination
            total={this.props.memberships.total}
            perPage={this.props.memberships.perPage}
            currentPage={this.props.location.query.page || 1}
            path='memberships/approve'
          />
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(ApproveMemberships);
