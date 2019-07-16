import {PlayingCards,PokerHandRate} from '../../lib/ratings.js';
import { combineReducers } from 'redux';
import _ from "lodash"

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'newCards':
      const deck = new PlayingCards();
      const {
        cards: hand1,
        restCards
      } = deck.getNCardsAndRest(5,0);
      // console.log
      const {
        cards: hand2,
        restCards: rest
      } = restCards.getNCardsAndRest(5,0);
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
      // return 1===1
      // ?
      // const copy = _.clone(state);
      // copy.hand1.cards = copy.hand1.cards.map( el => { return { ...el,toggled: true} });
      // console.log(copy);
      return state;
      // return state;
      // :
      // {
      //   ...state,
      //   hand2: {
      //     ...state.hand2,
      //     cards: state.hand2.cards.map( el => { if ( el.id===action.id ) return { ...el,toggled:true}} )
      //   }
      // }
    default:
      return state;
  }
}

export default reducer;
