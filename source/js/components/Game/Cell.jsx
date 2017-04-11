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
    children: PropTypes.number,
  }

  render() {
    const state = this.props.children;

    const style = {
      width: '40px',
      height: '40px',
      float: 'left',
      lineHeight: '40px',
      border: '1px solid red',
      textAlign: 'center',
      background: backgroundMap[state],
    };

    return (
      <div className='cell' style={style}>
        {state}
      </div>
    );
  }
}
