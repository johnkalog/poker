import React from 'react';
import { connect } from 'react-redux';
import Card from './card/index'; // ta . sto telos
import './hand.css';
import {
  cards, comb, show, onChangeClick,
} from '../../../models/poker';

export const Hand = ({
  cards, id, comb, show, onChangeClick,
}) => {
  const combination = show ? comb : '        ';
  const but = id !== 1 ? (
    <button className="change" onClick={() => onChangeClick(id)}>
        Change
    </button>
  ) : (
    <div className="noButton" />
  );
  return (
    <div className="playingCards simpleCards rotateHand">
      <ul className="table">
        <div className="rate">{combination}</div>
        <div className="id">
          {'       '}
          {id}
          {'.   '}
        </div>
        {cards.map((
          el,
          index, // poia dunstions sto dispatch
        ) => (
          <li key={index}>
            <Card hand={id} el={el} />
          </li>
        ))}
        {but}
      </ul>
    </div>
  );
};

export default connect(
  (state, ownProps) => ({
    id: ownProps.id,
    ...cards(state, ownProps),
    ...comb(state, ownProps),
    ...show(state),
  }),
  dispatch => ({
    ...onChangeClick(dispatch),
  }),
)(Hand);
