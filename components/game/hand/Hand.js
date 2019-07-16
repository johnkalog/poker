import React from 'react';
import { connect } from 'react-redux';
import Card from './card/Card'; //ta . sto telos
import './hand.css';

export const Hand = ({cards, id, comb }) =>
  (<div className="playingCards simpleCards rotateHand">
    <ul className="table">
      <div className="rate">
        {comb}
      </div>
      <div className="id">
      {'       '}{id}{'.   '}
      </div>
      {cards.map( (el, index) =>  //poia dunstions sto dispatch
        <li key={index}>
          <Card hand={id} el={el}/>
        </li>
      )}
      <button className="change">
        Change
      </button>
    </ul>
  </div>
);

export default connect(
    (state,ownProps) => {
      return ownProps.id===1
      ?
      {
        id: ownProps.id,
        cards: state.hand1.cards,
        comb: state.combination1
      }
      :
      {
        id: ownProps.id,
        cards: state.hand2.cards,
        comb: state.combination2
      }
    },
    null
  )(Hand);