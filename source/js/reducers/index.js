import { combineReducers } from 'redux';
import game from 'reducers/game';
import auth from 'reducers/auth';

export default combineReducers({
  game, auth,
});
