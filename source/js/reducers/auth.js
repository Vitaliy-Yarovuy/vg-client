import { Map } from 'immutable';

import {
  ANONYM_LOGIN_ACTION_START,
  ANONYM_LOGIN_ACTION_SUCCESS,
} from 'actions/auth';

const initialState = Map({
  asyncLoading: false,
  user: null,
  token: null,
});

const actionsMap = {
  [ANONYM_LOGIN_ACTION_START]: (state) => {
    return Object.assign({}, state, { asyncLoading: true });
  },

  [ANONYM_LOGIN_ACTION_SUCCESS]: (state, action) => {
    const { user, token } = action.data;
    return Object.assign({}, state, { user, token, asyncLoading: false });
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}