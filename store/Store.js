import { createStore, combineReducers } from 'redux';
import { dataReducer, showReducer } from '../models/poker';

const store = createStore(
  combineReducers({ data: dataReducer, show: showReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
