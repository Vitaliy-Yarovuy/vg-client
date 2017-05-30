import {
  LOGOUT_ACTION,
  LOGIN_ACTION,
  RESPONCE_WAITING,
} from 'actions/app';

const initialState = {
  waitingLoader: false,
  user: null,
  token: null,
};

const actionsMap = {
  [LOGOUT_ACTION]: (state) => {
    return Object.assign({}, state, initialState);
  },

  [LOGIN_ACTION]: (state, action) => {
    const { user, token } = action.data;
    return Object.assign({}, state, { user, token });
  },

  [RESPONCE_WAITING]: (state, action) => {
    return Object.assign({}, state, { waitingLoader: action.data });
  },

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}