import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CELL_TYPES, SIDE_SIZE, TEAMS } from 'structures/game';



const backgroundMap = {
  [CELL_TYPES.EMPTY]: '',
  [CELL_TYPES.RED]: 'rgba(255,0,0,.6)',
  [CELL_TYPES.GREEN]: 'rgba(0,255,0,.6)',
  [CELL_TYPES.RED_DEAD]: 'rgba(144,255,0,.7)',
  [CELL_TYPES.GREEN_DEAD]: 'rgba(255,144,0,.7)',
};


export default class Cell extends Component {
  static propTypes = {
    index: PropTypes.number,
    state: PropTypes.number,
    availableRed: PropTypes.bool,
    availableGreen: PropTypes.bool,
    onClick: PropTypes.func
  };

  render() {

    const {
      index,
      state,
      availableRed,
      availableGreen,
      onClick
    } = this.props;

    const style = {
      position: 'relative',
      width: '40px',
      height: '40px',
      float: 'left',
      lineHeight: '40px',
      border: '1px solid #555',
      textAlign: 'center',
      background: backgroundMap[state],
    };

    const indicatorsStyle = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      margin: '-8px 0 0 -8px',
      width: '16px',
      height: '16px',
      display: 'flex',
    };
    const indicatorRedStyle = {
      flex: '1 100%',
      background: backgroundMap[CELL_TYPES.RED],
    };
    const indicatorGreenStyle = {
      flex: '1 100%',
      background: backgroundMap[CELL_TYPES.GREEN],
    };

    return (
      <div className='cell' style={style} onClick={onClick}>
        <div style={indicatorsStyle}>
          { availableRed && <div style={indicatorRedStyle}></div> }
          { availableGreen && <div style={indicatorGreenStyle}></div> }
        </div>
        {index}
      </div>
    );
  }
}
