'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class PaginationButton extends React.Component {
  constructor(path) {
    super();
    this.state = { path };
  }
  render() {
    return (
      <Link to={`/scoreboard/${this.state.path}`} query={{ page: this.props.eventKey }}>
        {this.props.children}
      </Link>
    );
  }
}
