import { ENTER_ROOM_ACTION, LEAVE_ROOM_ACTION } from 'actions/room';

const initialState = {
  users: [],
  games: [],
  msgs:[]
};

const actionsMap = {
 []
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}