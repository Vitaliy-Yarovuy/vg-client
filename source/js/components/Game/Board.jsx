import React, { Component } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cell from 'components/Game/Cell';
import { CELL_TYPES, SIDE_SIZE, TEAMS, CELL_RED_TYPES, CELL_GREEN_TYPES } from 'structures/game';

const NEIGHBORHOODS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
];

const toIndex = p => p[0] + p[1] * SIDE_SIZE;
const toPoint = index => [index % SIDE_SIZE, Math.floor(index / SIDE_SIZE)];

const getNeighbors = (index)=>{
  const point = toPoint(index);
  return  NEIGHBORHOODS
    .map(p => _.zipWith(p, point, _.add))
    .filter(p => p.every(a => a >= 0 && a < SIDE_SIZE))
    .map(toIndex);
};



export default class Board extends Component {
  static propTypes = {
    cells: PropTypes.arrayOf(PropTypes.number),
    nextMove: PropTypes.number,
    onCellClick: PropTypes.func,
  };

  constructor() {
    super();

    this.getFullState = this.getFullState.bind(this);
  }


  getFullState(index){
    const { onCellClick, nextMove, cells } = this.props;
    const neighbors = getNeighbors(index);
    const state = cells[index];
    const nextRed = nextMove === TEAMS.RED;

    const available = state === CELL_TYPES.EMPTY ||
      nextRed && state === CELL_TYPES.GREEN ||
      !nextRed && state === CELL_TYPES.RED;
    const availableRed = available && nextRed && neighbors.some(i => CELL_RED_TYPES.includes(cells[i]));
    const availableGreen = available && !nextRed && neighbors.some(i => CELL_GREEN_TYPES.includes(cells[i]));

    console.log(index, available, availableRed, availableGreen);
    return {
      index,
      state,
      availableRed,
      availableGreen,
      onClick: ()=>{ available && (availableRed || availableGreen) && onCellClick(index); }
    };
  };

  render() {
    const {
      cells,
      nextMove
    } = this.props;

    const style = {
      width: '402px',
      height: '402px',
      border: '1px solid #aaa',
    };

    return (
      <div className='Board'>
        <div style={ style }>
          {cells.map(
            (_, i) => {
              {/*console.log(i, fullState);*/}
              return <Cell key={ i } {...this.getFullState(i) } />;
            }
          )}
        </div>
      </div>
    );
  }
}
