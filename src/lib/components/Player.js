import React from 'react';
import {Card} from './Card.js'
import {getEntity} from '../reactFunctions.js';

export const Player = ({ cards, id, comb }) => ( //allagh se destructure
  //mapping in jsx
  //arrow function better
  <div className="playingCards simpleCards rotateHand">
    <ul className="table">
      <div className="rate">
        {comb}
      </div>
      <div className="id">
      {'       '}{id}{'.   '}
      </div>
      {cards.map( (el, index) =>
        <li key={index}>
          <Card rank={el.rank} suit={el.suit} entity={getEntity(el.suit)}/>
        </li>
      )}
    </ul>
  </div>
);
