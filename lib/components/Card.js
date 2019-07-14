import React from 'react';
import { connect } from 'react-redux';

export const Card = ({store,player,rank,suit,entity,id}) =>  {//{props.entity} px &spades;
const x=1;
  return x==1
    ?
    (<label for="c-2D" className={`card rank-${rank} ${suit}`}>
    <span className="rank">{rank}</span>
    <span className="suit">{entity}</span>
    <input type="checkbox" name="c-2D" id="c-2D" value="select" onClick={()=> selected(player,id,store)}/>
    </label>)
    :
    (<a className={`card rank-${rank} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{entity}</span>
    </a>)
}

const selected = (player, id, store) => {
  store.dispatch({type:'toggleCard',
                  payload: {
                    player: player,
                    id: id
                  }
                });
}
