import React from 'react';

export const Card = ({rank,suit,entity}) =>  //{props.entity} px &spades;
(
  <a className={`card rank-${rank} ${suit}`}>
    <span className="rank">{rank}</span>
    <span className="suit">{entity}</span>
  </a>
);
