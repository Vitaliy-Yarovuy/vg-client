import { combineReducers } from 'redux';
import game from 'reducers/game';
import app from 'reducers/app';
import room from 'reducers/room';

export default combineReducers({
  game, app, room,
});
