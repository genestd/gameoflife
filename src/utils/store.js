import { createStore } from 'redux';
import rootReducer from '../reducers';

import showNav from '../reducers/showNav';

const store = createStore(rootReducer);
export default store;
