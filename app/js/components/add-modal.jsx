'use strict';

import React from 'react';
import Modal from './modal';
import '../bootstrap-datetimepicker';
import moment from 'moment-timezone';

export default class AddModal extends React.Component {

  constructor() {
    super();
    this.state = { endDate: 'date' };
    this.submit = this.submit.bind(this);
    this.endDate = this.endDate.bind(this);
    this.initializePickers = this.initializePickers.bind(this);
  }

  componentDidMount() {
    this.initializePickers();
  }

  componentDidUpdate() {
    this.initializePickers();
  }

  submit() {
    const startPicker = $(`#start-date-${this.props.membership.id}`).data('datetimepicker');
    const endPicker = $(`#end-date-${this.props.membership.id}`).data('datetimepicker');

    const membership = ['name', 'description', 'location', 'image', 'committeeName']
      .reduce((prev, key) => {
        prev[key] = this.refs[key].getDOMNode().value || null;
        return prev;
      }, {});

    membership.startDate = moment.tz(startPicker.getLocalDate(), 'America/New_York').utc().toDate();
    membership.endDate = moment.tz(endPicker.getLocalDate(), 'America/New_York').utc().toDate();
    this.props.submit(membership);
  }

  initializePickers() {
    if (this.props.show) {

      const startPicker = $(`#start-date-${this.props.membership.id}`).datetimepicker().data('datetimepicker');

      startPicker.setLocalDate(new Date(this.props.membership.startDate) || new Date());

      if (this.state.endDate === 'date') {
        const endPicker = $(`#end-date-${this.props.membership.id}`).datetimepicker().data('datetimepicker');
        endPicker.setLocalDate(new Date(this.props.membership.endDate) || new Date());
      }
    }
  }

  endDate() {
    if (this.state.endDate === 'date') {
      return (
        <div>
          <label className='control-label col-sm-2' htmlFor='endDate'>End Date</label>
          <div className='col-sm-10'>
            <div className='datetimepicker input-append date' id={`end-date-${this.props.membership.id}`} ref='endDate'>
              <input data-format='yyyy-MM-dd' type='text' />
              <span className='add-on'>
                <i data-date-icon='fa fa-calendar'></i>
              </span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <label className='control-label col-sm-2' htmlFor='duration'>Duration</label>
        <div className='col-sm-10'>
          <input type='text' id='duration' placeholder='Duration (in weeks)' ref='name' />
        </div>
      </div>
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
              <input type='text' id='dce' placeholder='DCE' defaultValue={this.props.membership.user.dce} ref='name' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='firstName'>First Name</label>
            <div className='col-sm-10'>
              <input type='text' id='firstName' placeholder='First Name' defaultValue={this.props.membership.user.firstName} ref='name' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='lastName'>Last Name</label>
            <div className='col-sm-10'>
              <input type='text' id='lastName' placeholder='Last Name' defaultValue={this.props.membership.user.lastName} ref='name' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='startDate'>Start Date</label>
            <div className='col-sm-10'>
              <div className='datetimepicker input-append date' id={`start-date-${this.props.membership.id}`} ref='startDate'>
                <input data-format='yyyy-MM-dd' type='text'/>
                <span className='add-on'>
                  <i data-date-icon='fa fa-calendar'></i>
                </span>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='radio-inline'>
              <label>
                <input
                  type='radio'
                  name='radios'
                  id='radio-day'
                  value='date'
                  onClick={() => this.setState({ endDate: 'date' })}/>
                Choose End Date
              </label>
            </div>
            <div className='radio-inline'>
              <label>
                <input
                  type='radio'
                  name='radios'
                  id='radio-week'
                  value='week'
                  onClick={() => this.setState({ endDate: 'week' })}/>
                Choose duration
              </label>
            </div>
            {this.endDate()}
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='reason'>Reason</label>
            <div className='col-sm-10'>
              <textarea rows='2' id='reason' placeholder='reason' defaultValue={this.props.membership.description} ref='description' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='committee'>Committee</label>
            <div className='col-sm-10'>
              <select id='committee' defaultValue={this.props.membership.committeeName} ref='committeeName'>
                {this.props.committees.map(committee => <option key={committee.name} value={committee.name}>{committee.name}</option>)}
              </select>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}
