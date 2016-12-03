/*import React from 'react';
import ReactDOM from 'react-dom';
import GameOfLife from './components/GameOfLife';
import './styles/main.scss';
import 'grommet/scss/vanilla/index.scss';

ReactDOM.render( <GameOfLife/>, document.getElementById('app') );
*/
import React from 'react';
import {render} from 'react-dom';
import store from './utils/store';
import './styles/main.scss';
import 'grommet/scss/vanilla/index.scss';

/*
 * The Provider component provides
 * the React store to all its child
 * components so we don't need to pass
 * it explicitly to all the components.
 */
import {Provider} from 'react-redux';

import GameOfLife from './components/GameOfLife';
//import DevTools from './containers/DevTools';


/*
 * This creates the store so we
 * can listen to changes and
 * dispatch actions.
 */
//store = createStore(showNav, initialState);

const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
      <div>
        <GameOfLife />
      </div>
    </Provider>,
  rootElement
);
