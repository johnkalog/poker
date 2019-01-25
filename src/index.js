import React from 'react';
import ReactDOM from 'react-dom';
import './lib/css/cards.css';
import './lib/css/index.css';
import {Game} from './lib/components/Game.js'
import {store} from './lib/myStore.js'

//===========================================

const render = () => {
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
}

store.subscribe(render);
store.dispatch({type:'newCards'});
