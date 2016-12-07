import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions';

import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Footer from 'grommet/components/Footer';
import SideSplit from 'grommet-addons/components/SideSplit';
import GLHeader from '../components/GLHeader';
import GLNav from '../components/GLNav';
import GLBoard from '../components/GLBoard';

/**
* This is the main app class for the Game of Life.  It sets up a series of
* grommet components to display the app.  The main component is the SideSplit
* component which contains the Game board and a menu component.  The menu
* component is hidden unless activated by the user.
*/
const GameOfLife = props => {

/**
* This function is called automatically by grommet when the interfaces width changes
* above or below 750px.  The app only uses this when it initializes to determine
* if the screen is mobile or not and set the initial board size based on the value
*
* NOTE: The SideSplit class was modified for this app to call the callback function
* passed to onResponsive prop.  It doesn't do this by default!!
*
* @param {string} mode - passed by the UX based on width of screen ('single/multiple')
*/
  const checkMobile = (mode) => {
    let small = mode === 'single' ? true : false
    if (props.mobile === undefined){
      props.actions.setMobile(small)
      if (small){
        props.actions.setSize({width: 20, height: 30, id: 0})
      } else {
        props.actions.setSize({width: 50, height: 30, id: 2})
      }
    }
  };

/**
*
*/
return(
    <App className="gol">
      <Article>
        <GLHeader />
          <SideSplit active={props.nav} onResponsive={checkMobile}>
             <GLNav />
             <GLBoard />
          </SideSplit>
        <Footer colorIndex="neutral-1-a" justify="center">&copy;&nbsp;2016 David Genest</Footer>
      </Article>
    </App>
  )
}

/**
* Redux function to map state to props.  This component uses the "showNav" value from
* the store to determine whether to show the nav component.  It also maps the mobile
* component which is used to determine the initial size of the board.
*
* @param {object} state - the redux store
*/
const mapStateToProps = (state) => {
  return ({
    nav: state.showNav.showNav,
    mobile: state.appSettings.mobile
  })
};

/**
* Redux function to map dispatch to props.  It binds dispatch to the imported
* actions functions and passes them as props.  This component uses the
* setMobile() and setSize() functions.  
*/
const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch)
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOfLife);
