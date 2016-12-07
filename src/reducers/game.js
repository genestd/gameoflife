import {
  START_GAME,
  STOP_GAME,
  ADD_GEN,
  RESET_GAME
} from '../actions';
import appSettings from '../reducers/appSettings';

/**
* The inital state of the game reducer
*/
const INITIAL_STATE = {
  running: false,
  generations: 0,
  interval: undefined
}

/**
* The game reducer handles actions related to the state of the game - whether it
* is running, number of generations, and the reference to the interval timer.
*
* @param {object} state = the state from the redux store
* @param {object} action = the action dispatched to the reducer
*/
const game = function(state=INITIAL_STATE, action){
  let newState = Object.assign({}, state);
  switch(action.type){
    case START_GAME:
      if (newState.running === false){
        newState.running = true
        newState.interval = action.payload
      }

      return newState

    case STOP_GAME:
      newState.interval = undefined
      newState.running = false
      return newState


    case RESET_GAME:
      newState.running = false
      newState.generations = 0
      return newState

    case ADD_GEN:
      newState.generations++
      return newState

    default:
      return state
  }
}

export default game;
