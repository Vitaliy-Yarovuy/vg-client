import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from 'components/Game/Board';
import WinMessage from 'components/Game/WinMessage';
import {hit} from 'actions/game';
import { CELL_TYPES, SIDE_SIZE, TEAMS, STATES } from 'structures/game';


@connect(state => ({
  game: state.game
}))
export default class BoardPage extends Component {
     static propTypes = {
       game: PropTypes.object,
       dispatch: PropTypes.func,
     };

  render() {
    const {
      game,
      dispatch
    } = this.props;

    const team = game.nextMove === TEAMS.RED ? 'RED' : 'GREEN';
    const greenSize = game.cells.filter(cell=>cell === CELL_TYPES.GREEN).length;
    const redSize = game.cells.filter(cell=>cell === CELL_TYPES.RED).length;

    const messageWin = game.gameState === STATES.WIN_RED ? 'RED WIN!' : 'GREEN WIN!';

    const onCellClick = (index)=>{
      dispatch(hit(game.nextMove, index));
    };

    return (
      <div className='BoardPage'>
        <h2>Board</h2>
        <h3>Team:{team}</h3>
        <label>{(4 - game.moveCount)}/3</label>
        |
        <label style={{ color: 'green'}}>{greenSize}</label>:<label style={{ color: 'red'}}> {redSize}</label>
        <hr />

        <Board onCellClick={onCellClick}  {...game} />
        <WinMessage showModal={game.gameState !== STATES.PLAYING} text={messageWin} />


        <hr />
      </div>
    );
  }
}
