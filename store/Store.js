import { createStore, combineReducers } from 'redux';
import { dataReducer } from '../models/poker';

const store = createStore(
  dataReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
