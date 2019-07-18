import React from 'react';
import { connect } from 'react-redux';
import { getEntity } from '../../../../lib/reactFunctions'; // oxi sto idio epipedo onoma mono tote h katalhjh
import './cards.css';
import { onCardClick } from '../../../../models/poker';

export const Card = (
  {
    hand, rank, suit, id, toggled, entity, onCardClick,
  }, // {props.entity} px &spades;
) => (hand === 1 ? (
  <div className="card back">*</div>
) : (
  <label htmlFor="c-2D" className={`card rank-${rank} ${suit}`}>
    <span className="rank">{rank}</span>
    <span className="suit">{entity}</span>
    <input
      type="checkbox"
      name="c-2D"
      id="c-2D"
      value="select"
      checked={toggled}
      onChange={() => onCardClick(hand, id)}
    />
  </label>
));

export default connect(
  (state, ownProps) => ({
    hand: ownProps.hand,
    rank: ownProps.el.rank,
    suit: ownProps.el.suit,
    id: ownProps.el.id,
    toggled: ownProps.el.toggled,
    entity: getEntity(ownProps.el.suit),
  }), // apla prenoun ta props sto paidi tou
  dispatch => ({
    // h apo props
    ...onCardClick(dispatch),
  }),
)(Card);
