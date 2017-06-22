import { 
  ENTER_ROOM_ACTION, LEAVE_ROOM_ACTION, LOAD_ROOM_STATE_ACTION, 
  RECEIVE_MESSAGE_ACTION, USER_ENTERED_ROOM_ACTION, USER_LEAVED_ROOM_ACTION, 
} from 'actions/room';
import _ from 'lodash';

const initialState = {
  entered: false,
  users: [],
  games: [
    {id:'fdda765f-fc57-5604-a269-52a7df8164ec', user:'User1', title:'game #2232'},
    {id:'fdda765f-fc57-5604-a269-52a7df8164ec', user:'User2', title:'game #2232'},
    {id:'fdda765f-fc57-5604-a269-52a7df8164ec', user:'User3', title:'game #2232'},
  ],
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
    const users = state.users.concat([user]);
    return Object.assign({}, state, {users});
  },
  [USER_LEAVED_ROOM_ACTION]: (state, action) => {
    const {user} = action;
    const users = state.users.filter(u => u !== user);
    return Object.assign({}, state, {users});
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}