export const TOGGLE_NAV = 'TOGGLE_NAV';
export const TOGGLE_INFO = 'TOGGLE_INFO';
export const TOGGLE_CELL = 'TOGGLE_CELL';
export const SET_COLOR = 'SET_COLOR';
export const SET_SIZE = 'SET_SIZE';
export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const ADD_GEN = 'ADD_GEN';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const CLEAR_BOARD = 'CLEAR_BOARD';
export const SEED_BOARD = 'SEED_BOARD';
export const RESET_GAME = 'RESET_GAME';
export const SET_MOBILE = 'SET_MOBILE';
export const SET_SPEED = 'SET_SPEED';

export const toggleNav = () => ({
  type: TOGGLE_NAV
});
export const toggleInfo = () => ({
  type: TOGGLE_INFO
})
export const toggleCell = (key) => ({
  type: TOGGLE_CELL,
  key: key
});
export const setColor = (newColor) => ({
  type: SET_COLOR,
  newColor
});
export const setSize = (newSize) => ({
  type: SET_SIZE,
  payload: newSize
});
export const startGame = (interval) => ({
  type: START_GAME,
  payload: interval
});
export const stopGame = () => ({
  type: STOP_GAME
});
export const addGen = () => ({
  type: ADD_GEN
});
export const updateBoard = () => ({
  type: UPDATE_BOARD,
})
export const clearBoard = () => ({
  type: CLEAR_BOARD
})
export const seedBoard = board => ({
  type: SEED_BOARD,
  payload: board
})
export const resetGame = () => ({
  type: RESET_GAME
})
export const setMobile = (mobile) => ({
  type: SET_MOBILE,
  payload: mobile
})
export const setSpeed = (speed) => ({
  type: SET_SPEED,
  payload: speed
})
