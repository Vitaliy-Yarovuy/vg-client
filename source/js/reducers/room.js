import { 
  ENTER_ROOM_ACTION, LEAVE_ROOM_ACTION, LOAD_ROOM_STATE_ACTION, 
  RECEIVE_MESSAGE_ACTION, USER_ENTERED_ROOM_ACTION, USER_LEAVED_ROOM_ACTION, 
} from 'actions/room';
import _ from 'lodash';

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
  [RECEIVE_MESSAGE_ACTION]: (state, action) => {
    const {data, user} = action;
    return Object.assign({}, state, {msgs: state.msgs.concat({user, message:data})});
  },
  [USER_ENTERED_ROOM_ACTION]: (state, action) => {
    const {user} = action;
    return Object.assign({}, state, {users: state.users.concat([user])});
  },
  [USER_LEAVED_ROOM_ACTION]: (state, action) => {
    const {user} = action;
    return Object.assign({}, state, {users: _.remove(state.users, user)});
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}