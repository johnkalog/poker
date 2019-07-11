import {PlayingCards,PokerHandRate} from './ratings.js';
import { createStore } from 'redux';
import { combineReducers } from 'redux';

export const store = createStore(changeCards);

 function changeCards(state = {}, action){
  switch (action.type) {
    case 'newCards':
      const deck = new PlayingCards();
      const {
        cards: player1,
        restCards
      } = deck.getNCardsAndRest(5);
      const {
        cards: player2,
      } = restCards.getNCardsAndRest(5);
      const [combination1, combination2] = [PokerHandRate(player1), PokerHandRate(player2)];
      return {
        player1,
        player2,
        combination1,
        combination2
      }
    default:
      return state;
  }
}
