import React from 'react';
import { connect } from 'react-redux';
import Hand from './hand/index'; // gia auto index
import { determineWinner } from '../../lib/comparison';
import './game.css';
import {
  onNewClick, onShowClick, hand1, hand2, show,
} from '../../models/poker';

export const Game = ({
  hand1, hand2, show, onNewClick, onShowClick,
}) => {
  // console.log(hand1, hand2);
  const winner = determineWinner(hand1, hand2);
  const message = winner ? `Winner is ${winner}!` : 'Draw!';
  // chan
  return (
    <div>
      <div className="buttons">
        <button className="newGame" onClick={() => onNewClick()}>
          New Game
        </button>
        <button className="showWinner" onClick={() => onShowClick(1)}>
          Show Winner
        </button>
      </div>
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
    ...show(state),
  }),
  dispatch => ({
    ...onNewClick(dispatch),
    ...onShowClick(dispatch),
  }),
)(Game);
