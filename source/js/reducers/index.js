import { combineReducers } from 'redux';
import app from 'reducers/app';
import game from 'reducers/game';

export default combineReducers({
  app, game
});
