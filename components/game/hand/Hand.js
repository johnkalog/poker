import React from 'react';
import { connect } from 'react-redux';
import Card from './card/index'; // ta . sto telos
import './hand.css';
import { cards, comb, onChangeClick } from '../../../models/poker';


export const Hand = ({
  cards, id, comb, onChangeClick,
}) => (
  <div className="playingCards simpleCards rotateHand">
    <ul className="table">
      <div className="rate">{comb}</div>
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
      <button className="change" onClick={() => onChangeClick(id)}>
        Change
      </button>
    </ul>
  </div>
);

export default connect(
  (state, ownProps) => ({
    id: ownProps.id,
    ...cards(state, ownProps),
    ...comb(state, ownProps),
  }),
  dispatch => ({
    ...onChangeClick(dispatch),
  }),
)(Hand);
