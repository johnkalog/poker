import React from 'react';
import { connect } from 'react-redux';
import {getEntity} from '../reactFunctions.js';
//

export const Card = ({player,rank,suit,id,check,entity,onCardClick}) =>  {//{props.entity} px &spades;
  return check
    ?
    (<label for="c-2D" className={`card rank-${rank} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{entity}</span>
      <input type="checkbox" name="c-2D" id="c-2D" value="select" checked onClick={()=> onCardClick(player,id)}/>
    </label>)
    :
    (<label for="c-2D" className={`card rank-${rank} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{entity}</span>
      <input type="checkbox" name="c-2D" id="c-2D" value="select" onClick={()=> onCardClick(player,id)}/>
    </label>)
}

export const CardContainer = connect(
  (state,ownProps) => (
    { player: ownProps.player,
      rank: ownProps.el.rank,
      suit: ownProps.el.suit,
      id: ownProps.el.id,
      check: ownProps.el.check,
      entity: getEntity(ownProps.el.suit),
    }
  ),
  dispatch => ({  //h apo props
    onCardClick: (player, id) => {
      dispatch({type:'toggleCard',
                      payload: {
                        player: player,
                        id: id
                      }
                    });
    }
  })
)(Card);
