import React from 'react';
import { connect } from 'react-redux';
import Hand from './hand/index'; // gia auto index
import { determineWinner } from '../../lib/comparison';
import './game.css';
import {
  onNewClick,
  onRoundClick,
  onShowClick,
  hand1,
  score1,
  hand2,
  score2,
  show,
  roundCounter,
} from '../../models/poker';

export const Game = ({
  hand1,
  score1,
  hand2,
  score2,
  show,
  roundCounter,
  onNewClick,
  onRoundClick,
  onShowClick,
}) => {
  // console.log(hand1, hand2);
  const winner = determineWinner(hand1, hand2);
  const message = show
    ? roundCounter == 7
      ? score1 > score2
        ? 'Final Winner is 1!'
        : score1 < score2
          ? 'Final Winner is 2!'
          : 'Final Draw!'
      : winner
        ? `Winner is ${winner}!`
        : 'Draw!'
    : '';
  // chan
  return (
    <div>
      <div className="buttons">
        <button className="newGame" onClick={() => onNewClick()}>
          New Game
        </button>
        <button className="newRound" onClick={() => onRoundClick()}>
          New Round
        </button>
        <button className="showWinner" onClick={() => onShowClick(1)}>
          Show Winner
        </button>
      </div>
      <div className="scores">
        <h1 className="value">Score</h1>
        <h1 className="value">{`Round: ${roundCounter}`}</h1>
        <table className="score-table">
          <tr>
            <th className="value">Player 1</th>
            <th className="value">Player 2</th>
          </tr>
          <tr>
            <th className="value">{score1}</th>
            <th className="value">{score2}</th>
          </tr>
        </table>
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
    ...score1(state),
    ...hand2(state),
    ...score2(state),
    ...show(state),
    ...roundCounter(state),
  }),
  dispatch => ({
    ...onNewClick(dispatch),
    ...onRoundClick(dispatch),
    ...onShowClick(dispatch),
  }),
)(Game);
