import React from 'react';
import { connect } from 'react-redux';
import Hand from './hand/index'; // gia auto index
import { determineWinner } from '../../lib/comparison';
import './game.css';
import { onNewClick, hand1, hand2 } from '../../models/poker';


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
    ...hand1(state),
    ...hand2(state),
  }),
  dispatch => ({
    ...onNewClick(dispatch),
  }),
)(Game);
