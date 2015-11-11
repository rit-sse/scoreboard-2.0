'use strict';

import React from 'react';
import Pagination from 'react-bootstrap/lib/Pagination';
import PaginationButton from './pagination-button';

export default class PaginationClass extends React.Component {

  constructor() {
    super();

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event, selectedEvent) {
    const page = selectedEvent.eventKey;
  }

  render() {
    return (
      <Pagination
        first
        last
        ellipsis
        items={Math.ceil(this.props.total/this.props.perPage)}
        maxButtons={5}
        activePage={parseInt(this.props.currentPage, 10)}
        onSelect={this.handleSelect}
        buttonComponentClass={PaginationButton.bind(null, this.props.path)} />
    );
  }
}
