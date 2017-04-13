import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CELL_TYPES, SIDE_SIZE } from 'structures/cell';



const backgroundMap = {
  [CELL_TYPES.EMPTY]: '',
  [CELL_TYPES.RED]: 'rgba(255,0,0,.5)',
  [CELL_TYPES.GREEN]: 'rgba(0,255,0,.5)',
  [CELL_TYPES.RED_DEAD]: 'rgba(64,255,0,.6)',
  [CELL_TYPES.GREEN_DEAD]: 'rgba(255,64,0,.6)',
};


export default class Cell extends Component {
  static propTypes = {
    index: PropTypes.number,
    state: PropTypes.number,
    availableRed: PropTypes.bool,
    availableGreen: PropTypes.bool,
  };

  render() {

    const {
      index,
      state,
      availableRed,
      availableGreen,
    } = this.props;

    const style = {
      position: 'relative',
      width: '40px',
      height: '40px',
      float: 'left',
      lineHeight: '40px',
      border: '1px solid red',
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
      <div className='cell' style={style}>
        <div style={indicatorsStyle}>
          { availableRed && <div style={indicatorRedStyle}></div> }
          { availableGreen && <div style={indicatorGreenStyle}></div> }
        </div>
        {index}
      </div>
    );
  }
}
