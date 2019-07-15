import React from 'react';
import {Player} from './Player.js'
import {determineWinner} from '../comparison.js'
// import {store} from '../myStore.js'

// export const GameContainer = connect(
//   null,
//   null
// )(Game);

export const Game = ({ store }) => {
  const {
    player1,
    player2,
    combination1,
    combination2
  } = store.getState();
  const winner = determineWinner(player1,player2);
  const message = winner ? `Winner is ${winner}!` : 'Draw!';
  return (
    <div>
      <button className="newGame" onClick={ () => store.dispatch({type:'newCards'})}>
        New Game
      </button>
      <div className="twoHands">
        <Player dispatch={store.dispatch} cards={player1.cards} id={1} comb={combination1}/>
        <div className="winner">{message}</div>
        <Player dispatch={store.dispatch} cards={player2.cards} id={2} comb={combination2}/>
      </div>
    </div>
  );
}
