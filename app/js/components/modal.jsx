'use strict';

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

export default class FormModal extends React.Component {
  render() {
    return(
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.close}>{this.props.closeText}</Button>
            <Button onClick={this.props.submit} bsStyle='primary'>{this.props.submitText}</Button>
          </Modal.Footer>
      </Modal>
    );
  }
}
