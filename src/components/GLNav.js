import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions';

import SideBar from 'grommet/components/SideBar';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Box from 'grommet/components/Box';
import Close from 'grommet/components/icons/base/Close';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';

const GLNav = props => {
    return(
      <SideBar colorIndex="neutral-1-a" className={props.nav}>
        <Header pad="medium" justify="between">
          <Title>
            Settings
          </Title>
          <Button icon={<Close />} onClick={() => props.actions.toggleNav()} />
        </Header>
        <Menu>
          <h3>Cell Color</h3>
          <Tiles  fill={false} selectable={false} selected={1} separator="all">
            <Tile align="center" basis="small" flex={false} colorIndex="critical" basis="1/3"
              onClick={()=>{props.actions.setColor("critical");
                            props.actions.toggleNav(); }}>{props.color==="critical" ? <Checkmark/> : '\u00A0' }</Tile>
            <Tile align="center" basis="small" flex={false} colorIndex="warning" basis="1/3"
              onClick={()=>{props.actions.setColor("warning");
                            props.actions.toggleNav(); }}>{props.color==="warning" ? <Checkmark/> : '\u00A0'}</Tile>
            <Tile align="center" basis="small" flex={false} colorIndex="ok" basis="1/3"
              onClick={()=>{props.actions.setColor("ok");
                            props.actions.toggleNav(); }}>{props.color==="ok" ? <Checkmark/> : '\u00A0'}</Tile>
            <Tile align="center" basis="small" flex={false} colorIndex="neutral-3-a" basis="1/3"
              onClick={()=>{props.actions.setColor("neutral-3-a");
                            props.actions.toggleNav(); }}>{props.color==="neutral-3-a" ? <Checkmark/> : '\u00A0'}</Tile>
            <Tile align="center" basis="small" flex={false} colorIndex="accent-1" basis="1/3"
              onClick={()=>{props.actions.setColor("accent-1");
                           props.actions.toggleNav(); }}>{props.color==="accent-1" ? <Checkmark/> : '\u00A0'}</Tile>
            <Tile align="center" basis="small" flex={false} colorIndex="accent-2" basis="1/3"
              onClick={()=>{props.actions.setColor("accent-2");
                            props.actions.toggleNav(); }}>{props.color==="accent-2" ? <Checkmark/> : '\u00A0'}</Tile>
          </Tiles>
          <h3><br></br>Board Size</h3>
          <List selectable={true} selected={props.size.id}>
            <ListItem onClick={()=>{props.actions.setSize({width: 20, height: 30, id: 0});
                                    props.actions.toggleNav()}}>20 x 30</ListItem>
            <ListItem onClick={()=>{props.actions.setSize({width: 30, height: 30, id: 1});
                                    props.actions.toggleNav()}}>30 x 30</ListItem>
            <ListItem onClick={()=>{props.actions.setSize({width: 50, height: 30, id: 2});
                                    props.actions.toggleNav()}}>50 x 30</ListItem>
          </List>
          <h3><br></br>Speed</h3>
          <List selectable={true} selected={props.speed.id}>
            <ListItem onClick={()=>{props.actions.setSpeed({period: 1000, id: 0});
                                    props.actions.toggleNav()}}>Slow</ListItem>
            <ListItem onClick={()=>{props.actions.setSpeed({period: 500, id: 1});
                                    props.actions.toggleNav()}}>Medium</ListItem>
            <ListItem onClick={()=>{props.actions.setSpeed({period: 200, id: 2});
                                    props.actions.toggleNav()}}>Fast</ListItem>
          </List>
        </Menu>
      </SideBar>
    )
}

const mapStateToProps = (state) => {
  return ({
  nav: state.showNav.className,
  color: state.appSettings.color,
  size: state.appSettings.boardSize,
  speed: state.appSettings.speed
  })
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GLNav);
