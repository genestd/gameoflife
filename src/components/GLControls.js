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

  const startGame = () => {
    let ticker = setInterval( ()=>tick(), props.speed.period )
    props.actions.startGame(ticker);
  }

  const stopGame = () => {
    clearInterval( props.interval)
    props.actions.stopGame()
  }

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

const mapStateToProps = (state) => {
  return ({
    running: state.game.running,
    generations: state.game.generations,
    interval: state.game.interval,
    appColor: state.appSettings.color,
    speed: state.appSettings.speed
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch)
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(GLControls)
