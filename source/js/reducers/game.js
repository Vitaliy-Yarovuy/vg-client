import {
  CELL_TYPES, SIDE_SIZE, TEAMS,
  CELL_RED_TYPES, CELL_GREEN_TYPES,
  CELL_AVAILABLE_FOR_RED_TYPES,
  CELL_AVAILABLE_FOR_GREEN_TYPES,
  } from 'structures/game';

import { HIT_ACTION } from 'actions/game';


const cells = new Array(SIDE_SIZE * SIDE_SIZE).fill(CELL_TYPES.EMPTY);

cells[0] = CELL_TYPES.RED;
cells[cells.length - 1] = CELL_TYPES.GREEN;

const initialState = {
  cells,
  nextMove: TEAMS.GREEN,
  moveCount: 2,
  step: 0
};


const updateCell = (state, index, cell) => {
  const cells = state.cells.slice();
  cells[index] = cell;
  return Object.assign({}, state, { cells });
};

const checkFinishStep = (state)=>{
  if(state.moveCount <= 0){
    const step = state.step + 1;
    const moveCount = step < 2 ? 2 : 3;
    const nextMove = state.nextMove === TEAMS.RED? TEAMS.GREEN: TEAMS.RED;
    return Object.assign({}, state, { moveCount, nextMove, step });
  }
  return state;
};

const actionsMap = {
  [HIT_ACTION]: (state, action) => {
    const index = action.data.index;
    const cell = state.cells[index];
    const isRed = action.data.team === TEAMS.RED;

    if(isRed && CELL_AVAILABLE_FOR_RED_TYPES.includes(cell)){
      let updatedCell = cell === CELL_TYPES.EMPTY ? CELL_TYPES.RED : CELL_TYPES.GREEN_DEAD;
      let updateState = updateCell(state, index, updatedCell);
      updateState.moveCount--;
      return checkFinishStep(updateState);
    }

    if(!isRed && CELL_AVAILABLE_FOR_GREEN_TYPES.includes(cell)){
      let updatedCell = cell === CELL_TYPES.EMPTY ? CELL_TYPES.GREEN : CELL_TYPES.RED_DEAD;
      let updateState = updateCell(state, index, updatedCell);
      updateState.moveCount--;
      return checkFinishStep(updateState);
    }
    return state;
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
