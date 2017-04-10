import { Map, fromJS } from 'immutable';
import { CELL_TYPES } from 'structures/cell';

import {
  TEST_ACTION,
  TEST_ASYNC_ACTION_START,
  TEST_ASYNC_ACTION_ERROR,
  TEST_ASYNC_ACTION_SUCCESS,
} from 'actions/app';

const sideSize = 10;

const cells = [CELL_TYPES.GREEN].concat(
  new Array(sideSize * sideSize - 2).fill(CELL_TYPES.EMPTY),
  [CELL_TYPES.RED]);

const initialState = Map({
  counter: 0,
  asyncLoading: false,
  asyncError: null,
  asyncData: null,
  boardCells: fromJS(cells),
});


const actionsMap = {
  [TEST_ACTION]: (state) => {
    const counter = state.get('counter') + 1;

    return state.merge({
      counter,
    });
  },

  // Async action
  [TEST_ASYNC_ACTION_START]: (state) => {
    return state.merge({
      asyncLoading: true,
      asyncError: null,
    });
  },
  [TEST_ASYNC_ACTION_ERROR]: (state, action) => {
    return state.merge({
      asyncLoading: false,
      asyncError: action.data,
    });
  },
  [TEST_ASYNC_ACTION_SUCCESS]: (state, action) => {
    return state.merge({
      asyncLoading: false,
      asyncData: action.data,
    });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
