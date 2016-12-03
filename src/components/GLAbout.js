import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as GLActions from '../actions';
import Layer from 'grommet/components/Layer'
import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Button from 'grommet/components/Button'
import Paragraph from 'grommet/components/Paragraph'
import Anchor from 'grommet/components/Anchor'
import Close from 'grommet/components/icons/base/Close'
import Box from 'grommet/components/Box'

const GLAbout = props => (
  <Layer align="right" hidden={props.hideInfo} flush={true}>
   <Header pad="none" colorIndex="neutral-1-a" justify="between">
     <Title></Title>
     <Title>About</Title>
     <Button icon={<Close/>} onClick={() => props.actions.toggleInfo()}>
     </Button>
   </Header>
  <Box pad="small">
  <Paragraph>The Game of Life (an example of a cellular automaton) is played
    on an infinite two-dimensional rectangular grid of cells.
    Each cell can be either alive or dead. The status of each cell changes
    each turn of the game (also called a generation) depending on the
    statuses of that cell's 8 neighbors. Neighbors of a cell are cells
    that touch that cell, either horizontal, vertical, or diagonal from that cell.</Paragraph>
  <Paragraph>The initial pattern is the first generation. The second
    generation evolves from applying the rules simultaneously to every cell
    on the game board, i.e. births and deaths happen simultaneously.
    Afterwards, the rules are iteratively applied to create future
    generations. For each generation of the game, a cell's status in the
    next generation is determined by a set of rules. These simple rules
    are as follows: </Paragraph>
  <Paragraph>If the cell is alive, then it stays alive if it has either 2
    or 3 live neighbors</Paragraph>
  <Paragraph>If the cell is dead, then it springs to life only in the case
    that it has 3 live neighbors</Paragraph>
  <Paragraph>For more info see: &nbsp;
  <Anchor href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" target="_blank">
    Conway's Game of Life
  </Anchor>
  </Paragraph>
  </Box>
</Layer>
)

const mapStateToProps = (state) => {
  return ({
    hideInfo: state.showNav.hideInfo
  })
};
const mapDispatchToProps = (dispatch) => ({
 actions: bindActionCreators(GLActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GLAbout);
