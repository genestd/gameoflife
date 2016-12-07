import {
  TOGGLE_NAV,
  TOGGLE_INFO
} from '../actions';

/**
* The default state for this reducer
*/
const INITIAL_STATE = { showNav: false, hideInfo: true, className: "hide" };

/**
* The showNav reducer handles actions related to the Nav menu and About Layer.
* It toggles values to show or hide the components.
*
* @param {object} state = the state from the redux store
* @param {object} action = the action dispatched to the reducer
*/
const showNav = function( state=INITIAL_STATE, action ){
  let newState = Object.assign( {}, state);
  switch( action.type ){
    
    case TOGGLE_NAV:
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
