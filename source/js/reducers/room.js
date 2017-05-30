import { ENTER_ROOM_ACTION, LEAVE_ROOM_ACTION, LOAD_ROOM_STATE_ACTION } from 'actions/room';

const initialState = {
  entered: false,
  users: [],
  games: [],
  msgs:[]
};


const actionsMap = {
  [ENTER_ROOM_ACTION]: (state) => {
    return Object.assign({}, state, {entered: true});
  },
  [LEAVE_ROOM_ACTION]: (state) => {
    return Object.assign({}, state, initialState);
  },
  [LOAD_ROOM_STATE_ACTION]: (state, action) => {
  	const {users, games, msgs} = action.data;
    return Object.assign({}, state, {users, games, msgs});
  },

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}