import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import GLControls from '../components/GLControls';
import Box from 'grommet/components/Box';
import Row from '../components/Row';
import Cell from '../components/Cell';

const GLBoard = props =>  {
  if( props.mobile === undefined){
    console.log('board')
    return null;
  }
  let board = [];
  let counter = 0;
  for( let y=0; y<props.size.height; y++){
    const newRow=[];
    for( let x=0; x<props.size.width; x++){
      let key = x + "x" + y + "y"
      newRow.push(
        //<Cell key={counter} cellColor={props.appColor} alive={props.lives[counter].alive} {...cellDispatchProperties(counter)(props.dispatch)} />);
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

const mapStateToProps = (state) => {
  return ({
    size: state.appSettings.boardSize,
    mobile: state.appSettings.mobile
  });
}

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch),
    dispatch: dispatch
  })
};

const cellDispatchProperties =
  index =>
    dispatch => {
      return bindActionCreators(
        bindIndexToActionCreators(Actions, index), dispatch)
    }

const transformObjectValues = (obj, fn) => {
  var transformed = {}
  Object.keys(obj).forEach(key => {
    transformed[key] = fn(obj[key])
  })
  return transformed
}

export const bindActionCreator = (actionCreator, index) =>
  (...args) => {
     return Object.assign( actionCreator(...args), {index})
  }

const bindActionCreatorMap = (creators, index) => {
  return transformObjectValues(creators, actionCreator=>bindActionCreator(actionCreator,index))
}

export const bindIndexToActionCreators = (actionCreators, index) => {
  return typeof actionCreators === 'function'
   ? bindActionCreator(actionCreators, index)
   : bindActionCreatorMap(actionCreators, index)
}

export default connect(mapStateToProps, mapDispatchToProps)(GLBoard);
