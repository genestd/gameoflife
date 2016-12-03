import {
  START_GAME,
  STOP_GAME,
  ADD_GEN,
  RESET_GAME,
  clearBoard
} from '../actions';
import appSettings from '../reducers/appSettings';

const INITIAL_STATE = {
  running: false,
  generations: 0,
  interval: undefined
}

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
