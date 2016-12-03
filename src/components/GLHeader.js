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

const mapStateToProps = function(store) {
  return {
    hideInfo: store.showNav.hideInfo
  };
}

const mapDispatchToProps = (dispatch) => ({
 actions: bindActionCreators(GLActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GLHeader);
