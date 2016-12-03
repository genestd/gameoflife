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

const GameOfLife = props => {


  const checkMobile = (mode) => {
    console.log(mode)
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

const mapStateToProps = (state) => {
  return ({
    nav: state.showNav.showNav,
    mobile: state.appSettings.mobile
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch)
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOfLife);
