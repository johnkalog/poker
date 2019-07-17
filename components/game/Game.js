import React from 'react';
import { connect } from 'react-redux';
import Hand from './hand'; // gia auto index
import { determineWinner } from '../../lib/comparison';
import './game.css';
import { onNewClick } from '../../models/poker/dispatchHandlers';

export const Game = ({ hand1, hand2, onNewClick }) => {
  const winner = determineWinner(hand1, hand2);
  const message = winner ? `Winner is ${winner}!` : 'Draw!';
  return (
    <div>
      <button className="newGame" onClick={() => onNewClick()}>
        New Game
      </button>
      <div className="twoHands">
        <Hand id={1} />
        <div className="winner">{message}</div>
        <Hand id={2} />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    hand1: state.hand1,
    hand2: state.hand2,
  }),
  dispatch => ({
    ...onNewClick(dispatch),
  }),
)(Game);
