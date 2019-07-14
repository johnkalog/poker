import {PlayingCards,PokerHandRate} from './ratings.js';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import _ from "lodash"

export const store = createStore(changeCards, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

 function changeCards(state = {}, action){
  switch (action.type) {
    case 'newCards':
      const deck = new PlayingCards();
      const {
        cards: player1,
        restCards
      } = deck.getNCardsAndRest(5,0);
      // console.log
      const {
        cards: player2,
        restCards: rest
      } = restCards.getNCardsAndRest(5,0);
      const [combination1, combination2] = [PokerHandRate(player1), PokerHandRate(player2)];
      const counter1 = 0;
      const counter2 = 0;
      return {
        player1,
        combination1,
        counter1, //to check if over 3 for change
        player2,
        combination2,
        counter2,
        rest
      }
    case 'toggleCard':
      // return 1===1
      // ?
      // console.log(state.player1);
      // console.log({...state.player1,cards: state.player1.cards.map( el => { return {...el,id:10}; } )});
      return {
        ...state,
        player1: _.assign( {},
          state.player1
          // cards: state.player1.cards.map( el => el )
        )
      };
      // return state;
      // :
      // {
      //   ...state,
      //   player2: {
      //     ...state.player2,
      //     cards: state.player2.cards.map( el => { if ( el.id===action.id ) return { ...el,toggled:true}} )
      //   }
      // }
    default:
      return state;
  }
}
