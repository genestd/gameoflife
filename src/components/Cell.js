import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';

import Box from 'grommet/components/Box';

/**
* This class represents a single cell on the board for the Game of Life.
* It will be colored based on the setting selected by the user.  The cell
* has no contents other than a unicode "nbsp" character.
* @param {boolean} alive - the cell's state alive or dead.  Passed via state.
* @param {appColor} string - the color setting of the app used to color the cell.  Passed via state.
*/
const Cell = props =>  {
return (
    <Box colorIndex={props.alive ? props.appColor : "grey-3"}
         onClick={()=>props.actions.toggleCell(props.index)}
         flex={true}
         pad="none"
         separator="all"
         className="cell">
         {'\u00a0'}
    </Box> )
}

/**
* Redux function to map state to props.
* This function also takes the ownProps from the parent component.  This value is the
* XY coordinate of the cell in the form "0x0y", which provides a key to the store where the
* cell's state is managed.
* @param {object} state - the redux store
* @param {object} ownprops - the props from parent component, in this case the index of the cell
*/
const mapStateToProps = (state, ownProps) => {
  return ({
    appColor: state.appSettings.color,
    alive: state.appSettings.lives[ownProps.index].alive,
  });
}

/**
* Redux function to map dispatch to props.  It binds dispatch to the imported
* actions functions and passes them as props.  This component uses the
* toggleCell() function to allow user to click on the cell and toggle the
* state between alive/dead.
*/
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cell)

/*return ( <Box colorIndex={props.alive ? props.cellColor : "grey-1"}
              onClick={props.toggleCell}
              flex={true}
              pad="none"
              separator="all"
              className="cell"
              > {'\u00A0'}
         </Box> );
*/
