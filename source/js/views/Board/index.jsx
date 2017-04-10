import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cell from 'components/Game/Cell';


@connect(state => ({
  boardCells: state.app.get('boardCells'),
}))
export default class Board extends Component {
  static propTypes = {
    boardCells: PropTypes.arrayOf(PropTypes.number),
  }

  render() {
    const {
      boardCells
    } = this.props;

    const style = {
      width: '402px',
      height: '402px',
      border: '1px solid red',
    };


    return (
      <div className='Board'>
        <h2>Board</h2>

        <Button bsStyle="primary">Primary</Button>
        <hr />

        <div style={style}>
          {boardCells.map(
            (cell,i)=> <Cell key={i}>{cell}</Cell>
          )}
        </div>

        <hr />
      </div>
    );
  }
}
