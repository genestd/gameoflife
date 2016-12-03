import {
  TOGGLE_CELL
} from '../actions';

const INITIAL_STATE = { alive: false };

const update = (state, mutations) => {
  return Object.assign( {}, state, mutations);

}


const handleCell = function( state=INITIAL_STATE, action ){
  console.log(state, 'handling', action.key)
  switch( action.type ){
    case TOGGLE_CELL:
      state = update( state, {alive: state.alive ? false : true});
      return state;

    default:
      return state;
  }
}

export default handleCell;
