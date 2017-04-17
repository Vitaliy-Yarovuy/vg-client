import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { HIT_ACTION } from 'actions/game';
import { searchAvailableCell } from 'utils/search';
import {
  CELL_TYPES, SIDE_SIZE, TEAMS,
  CELL_RED_TYPES, CELL_GREEN_TYPES,
  CELL_AVAILABLE_FOR_RED_TYPES,
  CELL_AVAILABLE_FOR_GREEN_TYPES,
  STATES,
} from 'structures/game';
import bookImg from '../../../assets/img/book2.jpg';



export default class Board extends Component {
  static propTypes = {
    showModal: PropTypes.bool,
    text: PropTypes.string,
  };

  render() {
    const { showModal, text } = this.props;

    return (
      <Modal show={showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={ bookImg } alt='' className='ImgExample' />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


