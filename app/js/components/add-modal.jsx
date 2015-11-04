'use strict';

import React from 'react';
import Modal from './modal';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment-timezone';

export default class AddModal extends React.Component {

  constructor() {
    super();
    this.state = { endDate: 'date' };
    this.submit = this.submit.bind(this);
    this.endDate = this.endDate.bind(this);
  }

  submit() {
    const membership = ['reason', 'committeeName']
      .reduce((prev, key) => {
        prev[key] = this.refs[key].getDOMNode().value || null;
        return prev;
      }, {});

    membership.user = ['firstName', 'lastName', 'dce']
      .reduce((prev, key) => {
        prev[key] = this.refs[key].getDOMNode().value || null;
        return prev;
      }, {});

    membership.startDate = moment.tz(this.refs.startDate.getValue(), 'America/New_York').utc().toDate();
    if (this.state.endDate === 'date') {
      membership.endDate = moment.tz(this.refs.endDate.getValue(), 'America/New_York').utc().toDate();
    } else {
      membership.endDate = moment.tz(this.refs.startDate.getValue(), 'America/New_York').utc().add(this.refs.duration.getDOMNode().value, 'weeks');
    }
    this.props.close();
    this.props.submit(membership);
  }

  endDate() {
    if (this.state.endDate === 'date') {
      return (
        <div>
          <DateTimeField
            dateTime={moment().format()}
            format=''
            ref='endDate'
            inputFormat='YYYY-MM-DD'
            mode='date' />
        </div>
      );
    }
    return (
      <input className='form-control' type='number' id='duration' placeholder='Duration (in weeks)' ref='duration' />
    );
  }

  render() {
    return(
      <Modal
        show={this.props.show}
        close={this.props.close}
        closeText='Cancel'
        submitText={`${this.props.title} Memberships`}
        header={`${this.props.title} Memberships`}
        submit={this.submit}
      >
        <form className='form-horizontal'>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='dce'>DCE</label>
            <div className='col-sm-10'>
              <input className='form-control' type='text' id='dce' placeholder='DCE' defaultValue={this.props.membership.user.dce} ref='dce' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='firstName'>First Name</label>
            <div className='col-sm-10'>
              <input className='form-control' type='text' id='firstName' placeholder='First Name' defaultValue={this.props.membership.user.firstName} ref='firstName' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='lastName'>Last Name</label>
            <div className='col-sm-10'>
              <input className='form-control' type='text' id='lastName' placeholder='Last Name' defaultValue={this.props.membership.user.lastName} ref='lastName' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='startDate'>Start Date</label>
            <div className='col-sm-10'>
              <DateTimeField
                dateTime={moment().format()}
                format=''
                ref='startDate'
                inputFormat='YYYY-MM-DD'
                mode='date' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='endDate'>End Date</label>
            <div className='col-sm-10'>
              <div className='radio-inline'>
                <label>
                  <input
                    checked={this.state.endDate === 'date'}
                    type='radio'
                    name='radios'
                    id='radio-day'
                    value='date'
                    onClick={() => this.setState({ endDate: 'date' })}/>
                  Choose Date
                </label>
              </div>
              <div className='radio-inline'>
                <label>
                  <input
                    checked={this.state.endDate === 'week'}
                    type='radio'
                    name='radios'
                    id='radio-week'
                    value='week'
                    onClick={() => this.setState({ endDate: 'week' })}/>
                  Choose Duration
                </label>
              </div>
              {this.endDate()}
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='reason'>Reason</label>
            <div className='col-sm-10'>
              <textarea className='form-control' rows='2' id='reason' placeholder='reason' defaultValue={this.props.membership.description} ref='reason' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='committee'>Committee</label>
            <div className='col-sm-10'>
              <select className='form-control' id='committee' defaultValue={this.props.membership.committeeName} ref='committeeName'>
                {this.props.committees.map(committee => <option key={committee.name} value={committee.name}>{committee.name}</option>)}
              </select>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}
