import {PlayingCards,PokerHandRate} from '../../lib/ratings.js';
import { combineReducers } from 'redux';
import _ from "lodash";
import { getNCardsAndRest } from '../../lib/ratings.js';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'newCards':
      const deck = new PlayingCards();
      const {
        cards: hand1,
        restCards
      } = getNCardsAndRest(deck,5,0);
      // console.log
      const {
        cards: hand2,
        restCards: rest
      } = getNCardsAndRest(restCards,5,0);
      const [combination1, combination2] = [PokerHandRate(hand1), PokerHandRate(hand2)];
      const counter1 = 0;
      const counter2 = 0;
      return {
        hand1,
        combination1,
        counter1, //to check if over 3 for change
        hand2,
        combination2,
        counter2,
        rest
      }
    case 'toggleCard':
      return action.payload.hand===1 ? {
        ...state,
        hand1: {
          ...state.hand1,
          cards: state.hand1.cards.map( el => { if ( el.id===action.payload.id ) return { ...el,toggled:!el.toggled}; else  return el;} )
        }
      }
      :
      {
        ...state,
        hand2: {
          ...state.hand2,
          cards: state.hand2.cards.map( el => { if ( el.id===action.payload.id ) return { ...el,toggled:!el.toogled}; else  return el;} )
        }
      }
    default:
      return state;
  }
}

export default reducer;