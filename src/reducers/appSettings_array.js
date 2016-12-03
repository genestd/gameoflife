import {
  SET_COLOR,
  SET_SIZE,
  TOGGLE_CELL,
  UPDATE_BOARD,
  CLEAR_BOARD,
  SEED_BOARD
} from '../actions';
import handleCell from '../reducers/handleCell';

const initialise = (lives, height=30, width=50) => {
  for( let y=0; y<height*width; y++){
    lives[y] = {alive: false};
  }
  return lives;
}

const seed = board => {
  for( let i=0; i<board.length; i++){
    Math.random() < .12 ? board[i].alive=true : board[i].alive=false;
  }
  return board;
}

const lifeCycle = (board, height, width) => {
  let newBoard = JSON.parse(JSON.stringify(board));
  for( let i=0; i<board.length; i++){
    let neighbors = 0
    //row 1
    if( i < width){
      if(i===0){
        if (board[i+1].alive){ neighbors++ }
        if (board[i+width].alive){ neighbors++ }
        if (board[i+(width+1)].alive){ neighbors++ }
      } else if (i===(width-1)){
        if (board[i-1].alive){ neighbors++ }
        if (board[i+width].alive){ neighbors++ }
        if (board[i+(width-1)].alive){ neighbors++ }
      } else {
        if (board[i+1].alive){ neighbors++ }
        if (board[i-1].alive){ neighbors++ }
        if (board[i+(width-1)].alive){ neighbors++ }
        if (board[i+width].alive){ neighbors++ }
        if (board[i+(width+1)].alive){ neighbors++ }
      }
    //column 1
  } else if (i%width===0){
      if (i===(board.length-width)){
        if (board[i+1].alive){ neighbors++ }
        if (board[i-width].alive){ neighbors++ }
        if (board[i-(width-1)].alive){ neighbors++ }
      } else {
        if (board[i+1].alive){ neighbors++ }
        if (board[i-(width-1)].alive){ neighbors++ }
        if (board[i-width].alive){ neighbors++ }
        if (board[i+width].alive){ neighbors++ }
        if (board[i+(width+1)].alive){ neighbors++ }
      }
    //last column
  } else if ((i+1)%width===0){
      if (i===(board.length-1)){
        if (board[i-1].alive){ neighbors++ }
        if (board[i-width].alive){ neighbors++ }
        if (board[i-(width+1)].alive){ neighbors++ }
      } else {
        if (board[i-1].alive){ neighbors++ }
        if (board[i+width].alive){ neighbors++ }
        if (board[i+(width-1)].alive){ neighbors++ }
        if (board[i-width].alive){ neighbors++ }
        if (board[i-(width+1)].alive){ neighbors++ }
      }
    //last row
  } else if (i>=board.length-(width+1)){
      if (board[i-1].alive){ neighbors++ }
      if (board[i+1].alive){ neighbors++ }
      if (board[i-(width-1)].alive){ neighbors++ }
      if (board[i-width].alive){ neighbors++ }
      if (board[i-(width+1)].alive){ neighbors++ }
    //all other rows
    } else {
      if (board[i-1].alive){ neighbors++ }
      if (board[i+1].alive){ neighbors++ }
      if (board[i-(width-1)].alive){ neighbors++ }
      if (board[i-width].alive){ neighbors++ }
      if (board[i-(width+1)].alive){ neighbors++ }
      if (board[i+(width-1)].alive){ neighbors++ }
      if (board[i+width].alive){ neighbors++ }
      if (board[i+(width+1)].alive){ neighbors++ }
    }
    // set status based on cell neighbors
    if( board[i].alive===true){
      if (neighbors<2){
        newBoard[i].alive = false
      } else if (neighbors === 2 || neighbors === 3){
        newBoard[i].alive = true
      } else if (neighbors > 3){
        newBoard[i].alive = false
      }
    } else {
      if (neighbors === 3){
        newBoard[i].alive = true
      } else {
        newBoard[i].alive = false
      }
    }
  }
  return newBoard;
}

const INITIAL_STATE = { color: "ok",
                        boardSize: {height: 30, width: 50, id: 1},
                        lives: seed(initialise([]))
                      };


const appSettings = function( state=INITIAL_STATE, action ){
  let newState = Object.assign( {}, state);

  switch( action.type ){
    case SET_COLOR:
      newState.color = action.newColor;
      return newState;

    case SET_SIZE:
      if( action.payload.width != state.boardSize.width && action.payload.height != state.boardSize.height){
        newState.boardSize = action.payload;
        newState.lives = initialise([] , action.payload.height, action.payload.width);
        newState.lives = seed(newState.lives)
      }
      return newState;

    case TOGGLE_CELL:
      newState.lives = [
      ...state.lives.slice(0, action.index),
      handleCell(state.lives[action.index], action),
      ...state.lives.slice(action.index + 1)
      ]
      return newState;

    case CLEAR_BOARD:
      newState.lives = initialise( [], newState.boardSize.height, newState.boardSize.width)
      return newState;

    case UPDATE_BOARD:
      newState.lives = lifeCycle(state.lives, state.boardSize.height, state.boardSize.width)
      return newState;

    case SEED_BOARD:
      newState.lives = initialise([], state.boardSize.height, state.boardSize.width);
      newState.lives = seed(newState.lives)
      return newState;

    default:
      return state;
  }
}

export default appSettings;
