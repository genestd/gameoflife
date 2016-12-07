import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Play from 'grommet/components/icons/base/Play';
import Refresh from 'grommet/components/icons/base/Refresh';
import Stop from 'grommet/components/icons/base/Stop';
import Value from 'grommet/components/Value';

/**
* This component provides the Play/Stop/Refresh controls for the Game.
* If the game is running, only the Stop button is active. If the game is
* stopped, the Play/Refresh buttons are active.
*/
const GLControls = props => {

  const playButton = props.running
                   ? (<Button icon={<Play/>} fill={false}></Button>)
                   : (<Button icon={<Play colorIndex={"grey-3"}/>} fill={false} title="Start Game"
                              onClick={()=>startGame()}></Button>)
  const refreshButton = props.running
                    ? (<Button icon={<Refresh/>} fill={false}></Button>)
                    : (<Button icon={<Refresh colorIndex={"grey-3"}/>}
                               onClick={()=>{props.actions.resetGame();
                                             props.actions.seedBoard();}} fill={false}></Button>)
  const stopButton = props.running
                   ? (<Button icon={<Stop colorIndex={"grey-3"}/>} fill={false}
                              onClick={()=>stopGame()}></Button>)
                   : (<Button icon={<Stop/>} fill={false}></Button>)

  /**
  * This function sets an interval timer, with the interval set by settings.
  * Each iteration will increment the generations, and perform one life cycle of the game of life
  */
  const startGame = () => {
    let ticker = setInterval( ()=>tick(), props.speed )
    props.actions.startGame(ticker);
  }

  /**
  * This function stops the game by clearing the interval timer and sets the
  * running attribute to false.
  */
  const stopGame = () => {
    clearInterval( props.interval)
    props.actions.stopGame()
  }

  /**
  * This function is performed for each interval.  It increments the generations
  * and runs one cycle of the game of life.
  */
  const tick = () => {
    props.actions.addGen();
    props.actions.updateBoard();
  }

  return (
    <Box direction="row" pad={{horizontal: "none", vertical: "small", between: "small"}} alignSelf="center"
       responsive={false}>
      {playButton}
      {stopButton}
      {refreshButton}
    <Value value={props.generations} label="Generations" size="small"></Value>
  </Box> )

}

/**
* Redux function to map state to props.  This component uses:
*  running - to activate the controls based on state of the game
*  generations - to display the number of generations that have passed
*  interval - the id of the interval so that it can be stopped
*  speed - set by user in menu to affect the length of the timer interval
*
* @param {object} state - the redux store
*/
const mapStateToProps = (state) => {
  return ({
    running: state.game.running,
    generations: state.game.generations,
    interval: state.game.interval,
    appColor: state.appSettings.color,
    speed: state.appSettings.speed.speed
  });
}

/**
* Redux function to map dispatch to props.  It binds dispatch to the imported
* actions functions and passes them as props.  This component uses the
* startGame(), stopGame(), resetGame(), seedBoard(), addGen() and updateBoard
* functions.
*/
const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch)
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(GLControls)
