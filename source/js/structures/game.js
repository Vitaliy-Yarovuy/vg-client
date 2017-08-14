
export const CELL_TYPES = Object.freeze({
  EMPTY: 0,
  GREEN: 1,
  RED: 2,
  GREEN_DEAD: 3,
  RED_DEAD: 4,
});

export const CELL_RED_TYPES = [CELL_TYPES.RED, CELL_TYPES.GREEN_DEAD];
export const CELL_GREEN_TYPES = [CELL_TYPES.GREEN, CELL_TYPES.RED_DEAD];
export const CELL_AVAILABLE_FOR_RED_TYPES = [CELL_TYPES.EMPTY, CELL_TYPES.GREEN];
export const CELL_AVAILABLE_FOR_GREEN_TYPES = [CELL_TYPES.EMPTY, CELL_TYPES.RED];

export const TEAMS = Object.freeze({
  GREEN: 0,
  RED: 1
});



export const STATES = Object.freeze({
  WAITING: 0,
  PLAYING: 1,
  WIN_RED: 2,
  WIN_GREEN: 3
});


export const SIDE_SIZE = 10;