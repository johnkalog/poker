import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './css/index.css';
import Game from './components/game/index';
import store from './store';

//===========================================

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Game />
    </Provider>,
    document.getElementById('root'),
  );
};

store.subscribe(render);
store.dispatch({ type: 'NEW_CARDS' }); // no render because state inisializes for first time with the dispatch
