import React, { Component } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cell from 'components/Game/Cell';
import { CELL_TYPES, SIDE_SIZE } from 'structures/cell';

const NEIGHBORHOODS = [
	[-1,-1],[-1,0],[-1,1],
	[0,-1],[0,1],
	[1,-1],[1,0],[1,1]
];

const getFullState = (cells, index) => {
	point = [index % SIDE_SIZE, Math.floor(index / SIDE_SIZE)];

	NEIGHBORHOODS
		.map(p => _.zipWith(p, point, _.add)
		.filter(p => p.each(a => a > 0 && a < SIDE_SIZE))

   return {

   };
};


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
