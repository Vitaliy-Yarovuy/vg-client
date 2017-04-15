import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cell from 'components/Game/Cell';
import Board from 'components/Game/Board';
import {hit} from 'actions/game';
import { CELL_TYPES, SIDE_SIZE, TEAMS } from 'structures/game';


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

    const style = {
      width: '402px',
      height: '402px',
      border: '1px solid red',
    };

    const onCellClick = (index)=>{
      dispatch(hit(game.nextMove, index));
    };

    return (
      <div className='BoardPage'>
        <h2>Board</h2>
        <h3>Team:{team}</h3>
        <label>{(4 - game.moveCount)}/3</label>
        <hr />

        <Board onCellClick={onCellClick}  {...game}></Board>

        <hr />
      </div>
    );
  }
}
