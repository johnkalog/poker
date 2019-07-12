import React from 'react';

export const Card = ({key,rank,suit,entity}) =>  {//{props.entity} px &spades;
const x=1;
  return x==1
    ?
    (<label for="c-2D" className={`card rank-${rank} ${suit}`}>
    <span className="rank">{rank}</span>
    <span className="suit">{entity}</span>
    <input type="checkbox" name="c-2D" id="c-2D" value="select" onClick = {()=>{alert('fewfewf');}}/>
    </label>)
    :
    (<a className={`card rank-${rank} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{entity}</span>
    </a>)
}
