import React from 'react';
import {CardContainer} from './Card.js'
import { connect } from 'react-redux';


export const Player = ({cards, id, comb }) =>
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
          <CardContainer player={id} el={el}/>
        </li>
      )}
      <button className="change">
        Change
      </button>
    </ul>
  </div>
);

export const PlayerContainer = connect(
    (state,ownProps) => {
      return ownProps.id===1
      ?
      {
        id: ownProps.id,
        cards: state.player1.cards,
        comb: state.combination1
      }
      :
      {
        id: ownProps.id,
        cards: state.player2.cards,
        comb: state.combination2
      }
    },
    null
  )(Player);
