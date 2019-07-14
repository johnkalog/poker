import React from 'react';
import {Card} from './Card.js'
import {getEntity} from '../reactFunctions.js';

export const Player = ({ store, cards, id, comb }) =>
  (<div className="playingCards simpleCards rotateHand">
    <ul className="table">
      <div className="rate">
        {comb}
      </div>
      <div className="id">
      {'       '}{id}{'.   '}
      </div>
      {cards.map( (el, index) =>
        <li key={index}>
          <Card store={store} key={index} player={id} rank={el.rank} suit={el.suit} id={el.id} entity={getEntity(el.suit)}/>
        </li>
      )}
      <button className="change">
        Change
      </button>
    </ul>
  </div>
);
