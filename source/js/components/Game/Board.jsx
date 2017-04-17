import React, { Component } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cell from 'components/Game/Cell';
import { searchAvailableCell } from 'utils/search';
import { CELL_TYPES, SIDE_SIZE, TEAMS } from 'structures/game';


export default class Board extends Component {
  static propTypes = {
    cells: PropTypes.arrayOf(PropTypes.number),
    nextMove: PropTypes.number,
    onCellClick: PropTypes.func,
  };


  getFullState(){
    const { onCellClick, nextMove, cells } = this.props;
    const availableIndexes = searchAvailableCell(nextMove, cells);

    return cells.map((state, index)=>{
      const available = availableIndexes.includes(index);
      const availableRed = nextMove === TEAMS.RED && available;
      const availableGreen = nextMove === TEAMS.GREEN && available;
      return {
        index,
        state,
        availableRed,
        availableGreen,
        onClick: ()=>{ available  && onCellClick(index); }
      }

    });

  };

  render() {

    const style = {
      width: (40 * SIDE_SIZE + 2) + 'px',
      height: (40 * SIDE_SIZE + 2) +'px',
      border: '1px solid red',
    };

    const cellsExtended = this.getFullState();

    return (
      <div className='Board'>
        <div style={ style }>
          {cellsExtended.map(
            (state, i) => {
              return <Cell key={ i } {...state } />;
            }
          )}
        </div>
      </div>
    );
  }
}
