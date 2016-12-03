import { combineReducers } from 'redux';
import showNav  from '../reducers/showNav';
import appSettings from '../reducers/appSettings';
import game from '../reducers/game';

const rootReducer = combineReducers({
  showNav: showNav,
  appSettings: appSettings,
  game: game
});

export default rootReducer;
