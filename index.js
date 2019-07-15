import React from 'react';
import ReactDOM from 'react-dom';
import './lib/css/cards.css';
import './lib/css/index.css';
import {GameContainer} from './lib/components/Game.js';
import {store} from './lib/myStore.js';
import { Provider } from 'react-redux';

//===========================================

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
        <GameContainer />
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(render);
store.dispatch({type:'newCards'});  //no render because state inisializes for first time with the dispatch

//actioncreator
//same fullo
//collocate
//oxi combineReducers
//kathe presentationla exei container etsi mesw ths connect blepei mono auta pou ton endiaferoun
//oti exeoun ta props
//store createStore props h koino
//idio id gia touw player1
//() gia epistrofh objects
//Provider
