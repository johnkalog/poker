import React from 'react';
import Player from './player';  //gia auto index
import {determineWinner } from '../../lib/comparison';
import { connect } from 'react-redux';

export const Game = ({ player1, player2, onNewClick}) => {
  const winner = determineWinner(player1,player2);
  const message = winner ? `Winner is ${winner}!` : 'Draw!';
  return (
    <div>
      <button className="newGame" onClick={ () => onNewClick() }>
        New Game
      </button>
      <div className="twoHands">
        <Player id={1}/>
        <div className="winner">{message}</div>
        <Player id={2}/>
      </div>
    </div>
  );
}

export default connect(
    state => ({
      player1: state.player1,
      player2: state.player2
    }),
    dispatch => ({
      onNewClick: () => { dispatch({type:'newCards'}) }
    })
  )(Game);
