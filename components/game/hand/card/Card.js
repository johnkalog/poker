import React from 'react';
import { connect } from 'react-redux';
import { getEntity } from '../../../../lib/reactFunctions';  //oxi sto idio epipedo onoma mono tote h katalhjh
import './cards.css';

export const Card = ({hand,rank,suit,id,toggled,entity,onCardClick}) =>  {//{props.entity} px &spades;
  return toggled
    ?
    (<label htmlFor="c-2D" className={`card rank-${rank} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{entity}</span>
      <input type="checkbox" name="c-2D" id="c-2D" value="select" checked onClick={()=> onCardClick(hand,id)}/>
    </label>)
    :
    (<label htmlFor="c-2D" className={`card rank-${rank} ${suit}`}>
      <span className="rank">{rank}</span>
      <span className="suit">{entity}</span>
      <input type="checkbox" name="c-2D" id="c-2D" value="select" onClick={()=> onCardClick(hand,id)}/>
    </label>)
}

export default connect(
  (state,ownProps) => (
    { hand: ownProps.hand,
      rank: ownProps.el.rank,
      suit: ownProps.el.suit,
      id: ownProps.el.id,
      toggled: ownProps.el.toggled,
      entity: getEntity(ownProps.el.suit),
    }
  ),
  dispatch => ({  //h apo props
    onCardClick: (hand, id) => {
      dispatch({type:'toggleCard',
                      payload: {
                        hand: hand,
                        id: id
                      }
                    });
    }
  })
)(Card);
