import React from 'react';
import { connect } from 'react-redux';
//

export const Card = ({dispatch,player,rank,suit,entity,id,check}) =>  {//{props.entity} px &spades;
  return check
    ?
    (<label for="c-2D" className={`card rank-${rank} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{entity}</span>
      <input type="checkbox" name="c-2D" id="c-2D" value="select" checked onClick={()=> selected(player,id,dispatch)}/>
    </label>)
    :
    (<label for="c-2D" className={`card rank-${rank} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{entity}</span>
      <input type="checkbox" name="c-2D" id="c-2D" value="select" onClick={()=> selected(player,id,dispatch)}/>
    </label>)
    // (<a className={`card rank-${rank} ${suit}`}>
    //   <span className="rank">{rank}</span>
    //   <span className="suit">{entity}</span>
    // </a>)
}

const selected = (player, id, dispatch) => {
  dispatch({type:'toggleCard',
                  payload: {
                    player: player,
                    id: id
                  }
                });
}

export const CardContainer = connect(
  (state,ownProps) => { return { player: ownProps.player, rank: ownProps.rank, suit: ownProps.suit, id: ownProps.id, entity: ownProps.entity, check: ownProps.check}; },
  null
)(Card);
