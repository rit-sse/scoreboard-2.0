import React from 'react';
import { getMemberships, sortMemberships } from '../actions/memberships';
import { connect } from 'react-redux';
import MembershipTable from '../components/membership-table';
import Pagination from '../components/pagination';

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

  componentWillReceiveProps(newProps) {
    if (this.props.location.query.page !== newProps.location.query.page) {
      const { query } = newProps.location;
      this.props.dispatch(getMemberships(query.date || new Date(), query.page || 1));
    }
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
        <MembershipTable
          memberships={this.props.memberships}
          sort={this.sort}
        />
        <div className='text-center'>
          <Pagination
            total={this.props.memberships.total}
            perPage={this.props.memberships.perPage}
            currentPage={this.props.location.query.page || 1}
            path='memberships'
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Memberships);
