import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';

import Box from 'grommet/components/Box';

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

const mapStateToProps = (state, ownProps) => {
  return ({
    appColor: state.appSettings.color,
    alive: state.appSettings.lives[ownProps.index].alive,
  });
}

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
