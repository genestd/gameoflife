import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as GLActions from '../actions';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Actions from 'grommet/components/icons/base/Actions';
import Button from 'grommet/components/Button'
import CircleQuestion from 'grommet/components/icons/base/CircleQuestion';
import GLAbout from '../components/GLAbout'

const GLHeader = props => {
  return (
      <Header colorIndex="neutral-1-a"
              justify="between"
              >
        <Button onClick={()=>props.actions.toggleNav()} icon={<Actions/>} />
        <Title>
          Conway's Game of Life
        </Title>
        <Button icon={<CircleQuestion/>} onClick={()=>props.actions.toggleInfo() }/>
        <GLAbout />
      </Header>
    );
  }

/**
* Redux function to map state to props.  This component does not use any values
* from the store, it only dispatches actions.
*
* @param {object} state - the redux store
*/
const mapStateToProps = function(store) {
  return {
  };
}

/**
* Redux function to map dispatch to props.  It binds dispatch to the imported
* actions functions and passes them as props.  This component uses the
* toggleInfo() function to show/hide the "About" Layer and the toggleNav() function
* to show/hide the Nav Menu.
*/
const mapDispatchToProps = (dispatch) => ({
 actions: bindActionCreators(GLActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GLHeader);
