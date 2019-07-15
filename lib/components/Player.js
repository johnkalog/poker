import React from 'react';
import {CardContainer} from './Card.js'
import {getEntity} from '../reactFunctions.js';
import { connect } from 'react-redux';

// export const PlayerContainer = connect(
//   null,
//   null
// )(Player);

export const Player = ({ dispatch, cards, id, comb }) =>
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
          <CardContainer player={id} rank={el.rank} suit={el.suit} id={el.id} check={el.toggled} entity={getEntity(el.suit)}/>
        </li>
      )}
      <button className="change">
        Change
      </button>
    </ul>
  </div>
);
