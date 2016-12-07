import {
  SET_COLOR,
  SET_SIZE,
  TOGGLE_CELL,
  UPDATE_BOARD,
  SEED_BOARD,
  SET_MOBILE,
  SET_SPEED
} from '../actions';

/**
* This function populates the "board" with an initial random population.  It
* takes the height/width of the game board and creates an object for each cell.
* The object key is the XY coordinates in the form 0x0y.  The value is an object
* that contains a boolean representing the state of the cell and an array listing
* the cell's neighbors.
*
* @param {object} board - the current board of cells
* @param {number} width - the width of the board
* @param {number} height - the height of the board
*@return {object} newBoard - a new board with randomized cells
*/
const seed = (board, width, height) => {
  let newBoard = Object.assign({}, board)
  for( let x=0; x<width; x++){
    for( let y=0; y<height; y++){
      let key = x + "x" + y + "y"
      let neighbors = []
      if ( x===0 ){
        if (y===0){
          neighbors.push("1x0y","0x1y","1x1y", ((width-1) + "x0y"), ((width-1) + "x1y"), ((width-1) + "x" + (height-1 )+ "y"),
                        ("0x" + (height-1) + "y"), ("1x" + (height-1) + "y") )
        } else if (y===height-1){
          neighbors.push(((width-1 )+ "x" + (y-1) + "y"), (x + "x" + (y-1) + "y"), ((x+1) + "x" + (y-1) + "y"),
                         ((width-1) + "x" + y + "y"), (x+1 + "x" + y + "y"),
                         ((width-1) + "x0y"), (x + "x0y"), ((x+1) + "x0y"))
        } else {
          neighbors.push(((width-1) + "x" + (y-1)+ "y"), (x + "x" + (y-1 )+ "y"), ((x+1) + "x" + (y-1) + "y"),
                         ((width-1) + "x" + y + "y"), ((x+1) + "x" + y + "y"),
                         ((width-1) + "x" + (y+1) + "y"), (x + "x" + (y+1) + "y"),((x+1) + "x" + (y+1) + "y"))
        }
      } else if (x===width-1){
          if (y===0){
            neighbors.push(((x-1) + "x" + (height-1) + "y"), (x + "x" + (height-1) + "y"), ("0x" + (height-1) + "y"),
                           ((x-1) + "x" + y + "y"), ("0x0y"),
                           ((x-1) +  "x" + (y+1) + "y"), (x + "x" + (y+1) + "y"), ("0x" + (y+1) + "y"))
          } else if(y===height-1){
            neighbors.push(((x-1) + "x" + (y-1) + "y"), (x + "x" + (y-1) + "y"), ("0x" + (y-1) + "y"),
                           ((x-1) + "x" + y + "y"), ( "0x" + (height-1) + "y"),
                           ((x-1) + "x0y"), (x + "x0y"), "0x0y")
          } else {
            neighbors.push(((x-1) + "x" + (y-1) + "y"), (x + "x" + (y-1) + "y"), ("0x" + (y-1 )+ "y"),
                           ((x-1) + "x" + y + "y"), ("0x" + y + "y"),
                           ((x-1) + "x" + (y+1) + "y"), (x + "x" + (y+1) + "y"), ("0x" + (y+1) + "y"))
          }
      } else if (y===0){
          neighbors.push(((x-1) + "x" + (height-1) + "y"), (x + "x" + (height-1) + "y"), ((x+1) + "x" + (height-1) + "y"),
                         ((x-1) + "x" + y + "y"), ((x+1) + "x" + y + "y"),
                         ((x-1) + "x" + (y+1) + "y"), (x + "x" + (y+1) + "y"), ((x+1) + "x" + (y+1) + "y"))
      } else if (y===height-1){
          neighbors.push(((x-1) + "x" + (y-1) + "y"), (x + "x" + (y-1) + "y"), ((x+1) + "x" + (y-1) + "y"),
                         ((x-1) + "x" + y + "y"), ((x+1) + "x" + y + "y"),
                         ((x-1) + "x0y"), (x + "x0y"), ((x+1) + "x0y"))
      } else {
        neighbors.push (((x-1) + "x" + (y-1) + "y"), (x + "x" + (y-1) + "y"), ((x+1) + "x" + (y-1) + "y"),
                        ((x-1) + "x" + y + "y"), ((x+1) + "x" + y + "y"),
                        ((x-1) + "x" + (y+1) + "y"), ((x) + "x" + (y+1) + "y") ,((x+1) + "x" + (y+1) + "y"))
      }
      let value = { x: x,
                    y: y,
                    alive: Math.random() < .12 ? true : false,
                    neighbors: neighbors
                  }
      newBoard[key]=value
    }
  }
  return newBoard;
}

/**
* This function processes a generation of the Game of Life.  It takes a board,
* a height and a width.  For each cell in the board, it checks the neighbors array
* and calculates how many neighbors are living.  Then it applies Conway's rules to
* determine the new state based on previous state and number of live neighbors
*
* @param {object} board - the current board of cells
* @param {number} width - the width of the board
* @param {number} height - the height of the board
*@return {object} newBoard - a new board with Conway's rules applied
*/
const lifeCycle = (board, height, width) => {
  let newBoard = Object.assign({}, board)
  for( var prop in board){
    let livingNeighbors = 0
    for (let i=0; i<board[prop].neighbors.length; i++){
      if ( board[ board[prop].neighbors[i]].alive ){
        livingNeighbors++
      }
    }
    if (board[prop].alive){
    }
    // set status based on cell neighbors
    if( board[prop].alive===true){
      if (livingNeighbors<2){
        newBoard[prop] = Object.assign( {}, board[prop], {alive: false} )
      } else if (livingNeighbors === 2 || livingNeighbors === 3){
        newBoard[prop] = Object.assign( {}, board[prop], {alive: true} )
      } else if (livingNeighbors > 3){
        newBoard[prop] = Object.assign( {}, board[prop], {alive: false} )
      }
    } else {
      if (livingNeighbors === 3){
        newBoard[prop] = Object.assign( {}, board[prop], {alive: true} )
      } else {
        newBoard[prop] = Object.assign( {}, board[prop], {alive: false} )
      }
    }

  }
  return newBoard;
}

/**
* The default state for this reducer
*/
const INITIAL_STATE = { color: "ok",
                        mobile: undefined,
                        boardSize: {width: 50, height: 30, id: 2},
                        lives: seed( Object.assign({}), 50, 30),
                        speed: {speed: 500, id: 1}
                      };

/**
* The appSettings reducer.  It handles the following actions:
*   setColor(): called when user changes the color via settings menu
*   setSize(): called when user changes the size via settings Menu
*   toggleCell(): called when user taps cell to toggle state (alive/dead)
*   updateBoard(): called when game is running to process a generation
*   seedBoard(): called when board size changes to set initial random state
*   setMobile(): called when game is started to determine initial board size
*   setSpeed(): called when user changes the speed via the settings menu
*
* @param {object} state - the current state
* @param {object} action - the action that was dispatched
*/
const appSettings = function( state=INITIAL_STATE, action ){
  let newState

  switch( action.type ){
    case SET_COLOR:
      newState = Object.assign( {}, state, {color: action.newColor})
      return newState;

    case SET_SIZE:
      newState = Object.assign( {}, state )
      if( action.payload.width != state.boardSize.width || action.payload.height != state.boardSize.height){
        newState.boardSize = action.payload;
        newState.lives = seed(Object.assign({}), newState.boardSize.width, newState.boardSize.height)
      }
      return newState;

    case TOGGLE_CELL:
      let key = action.key

      let newVal = state.lives[action.key].alive ? false : true
      let newLife = Object.assign({}, state.lives[action.key], {alive: newVal} )
      newState = Object.assign( {}, state, {lives: Object.assign({}, state.lives, {[key]: newLife})} )
      return newState;

    case UPDATE_BOARD:
      newState = Object.assign({}, state, {lives: lifeCycle(state.lives, state.boardSize.height, state.boardSize.width)})
      return newState

    case SEED_BOARD:
      newState = Object.assign( {}, state, {lives: seed(Object.assign({}), state.boardSize.width, state.boardSize.height)})
      return newState;

    case SET_MOBILE:
      newState = Object.assign( {}, state, {mobile: action.payload})
      return newState

    case SET_SPEED:
      newState = Object.assign( {}, state, {speed: action.payload})
      return newState

    default:
      return state;
  }
}

export default appSettings;
