import { combineReducers } from 'redux';
import _ from 'lodash';
import { PlayingCards, PokerHandRate, getNCardsAndRest } from '../../lib/ratings.js';
import { newCards, toggleCard, changeCards } from '.';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case newCards.type:
      const deck = new PlayingCards();
      const { cards: hand1, restCards } = getNCardsAndRest(deck, 5, 0);
      const { cards: hand2, restCards: rest } = getNCardsAndRest(restCards, 5, 0);
      const [combination1, combination2] = [PokerHandRate(hand1), PokerHandRate(hand2)];
      const counter1 = 0;
      const counter2 = 0;
      return {
        hand1,
        combination1,
        counter1, // to check if over 3 for change
        hand2,
        combination2,
        counter2,
        rest,
      };
    case toggleCard.type:
      // const { hand, id } = toggleCard().payload;  gia apofygh tou toggleCard().paylod polles fores
      console.log(action.payload.id);
      return action.payload.hand === 1
        ? {
          ...state,
          hand1: {
            ...state.hand1,
            cards: state.hand1.cards.map((el) => {
              if (el.id === action.payload.id) return { ...el, toggled: !el.toggled };
              return el;
            }),
          },
        }
        : {
          ...state,
          hand2: {
            ...state.hand2,
            cards: state.hand2.cards.map((el) => {
              if (el.id === action.payload.id) return { ...el, toggled: !el.toggled };
              return el;
            }),
          },
        };
    case changeCards.type:
      let counter = 0;
      action.payload.id === 1
        ? state.hand1.cards.forEach((el) => {
          if (el.toggled === true) counter++;
        })
        : state.hand2.cards.forEach((el) => {
          if (el.toggled === true) counter++;
        });
      console.log(counter);
      return state;
    default:
      return state;
  }
};

export default reducer;
