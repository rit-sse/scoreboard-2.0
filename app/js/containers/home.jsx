'use strict';

import React from 'react';
import crypto from 'crypto';
import { connect } from 'react-redux';
import { getMembers } from '../actions/members';

function mapStateToProps(state) {
  return {
    members: state.members,
  };
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = { showAll: false };
    this.gravatar = this.gravatar.bind(this);
    this.row = this.row.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getMembers( query.date || new Date()));
  }

  gravatar(dce) {
    const hash = crypto.createHash('md5').update(`${dce}@rit.edu`).digest('hex');
    return `https://gravatar.com/avatar/${hash}?d=mm`;
  }

  row(member, index) {
    return (
      <tr key={index} >
        <td>{index + 1}</td>
        <td>
          <span className='inline-block vert-middle'>
            <img src={this.gravatar(member)} width='25px' />
          </span>
          <span className='inline-block vert-middle' style={{ marginLeft: '10px' }}>
            {member}
          </span>
        </td>
        <td>
          {this.props.members[member]}
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2 className='text-center'>High Scores</h2>
        <div className='row'>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>#</th>
                <th>Member</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {Object
                .keys(this.props.members)
                .sort((a, b) => this.props.members[b]-this.props.members[a])
                .map((member, index) => {
                  if (index < 10 || this.state.showAll ) {
                    return this.row(member, index);
                  }
                  return <span />;
                })
              }
            </tbody>
          </table>
        </div>
        <div className='text-center'>
          <button className='btn btn-link' onClick={() => this.setState({ showAll: !this.state.showAll })}>
            <p>{this.state.showAll ? 'Show Less' : 'Show More'}</p>
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
