import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import bookImg from '../../../assets/img/book2.jpg';




export default class Board extends Component {
  static propTypes = {
    showModal: PropTypes.bool,
    text: PropTypes.string,
  };

  close(){
    browserHistory.push('/');
  }

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


