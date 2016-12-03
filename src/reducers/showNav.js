import {
  TOGGLE_NAV,
  TOGGLE_INFO
} from '../actions';

const INITIAL_STATE = { showNav: false, hideInfo: true, className: "hide" };

const showNav = function( state=INITIAL_STATE, action ){
  let newState = Object.assign( {}, state);
  switch( action.type ){
    case TOGGLE_NAV:
      //newState.showNav =  newState.showNav === "show" ? "hide" : "show";
      newState.showNav =  newState.showNav === true ? false : true;
      newState.className =  newState.className === "show" ? "hide" : "show";
      return newState;

    case TOGGLE_INFO:
      newState.hideInfo = newState.hideInfo ? false : true
      return newState

    default:
      return state;
  }
}

export default showNav;
