import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import GLControls from '../components/GLControls';
import Box from 'grommet/components/Box';
import Row from '../components/Row';
import Cell from '../components/Cell';

/**
* This component is the board that holds the cells for the game.  It is responsive
* to the size selected in Settings by the user.  It will only render once the GameOfLife
* component sets the initial size based on the "mobile" attribute.  When it renders,
* it creates a Row component for each row of cells and fills it with Cells, passing the
* XY coordinates key to the Cell in the index prop so that it can access its state
* in the store.
* This component does not dispatch any actions.
*/
const GLBoard = props =>  {
  if( props.mobile === undefined){
    return null;
  }
  let board = [];
  let counter = 0;
  for( let y=0; y<props.size.height; y++){
    const newRow=[];
    for( let x=0; x<props.size.width; x++){
      let key = x + "x" + y + "y"
      newRow.push(
        <Cell key={key} index={key}/> )
      counter++;
    }
    board.push( <Row key={y}>{newRow}</Row> );
  }

  return(
    <Box pad="small" justify="center">
      <GLControls />
      {board}
    </Box>
  );
}

/**
* Redux function to map state to props.  This component uses the "size" value from
* the store to build the rows of cells.  It also uses the mobile value from the store
* to prevent rendering until the initial size is set.
*
* @param {object} state - the redux store
*/
const mapStateToProps = (state) => {
  return ({
    size: state.appSettings.boardSize,
    mobile: state.appSettings.mobile
  });
}

export default connect(mapStateToProps)(GLBoard);
