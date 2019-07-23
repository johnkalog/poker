import _ from 'lodash';
import { PlayingCards, PokerHandRate, getNCardsAndRest } from '../../lib/ratings';
import {
  newCards, toggleCard, changeCards, changeBest,
} from '.';
import { changeBestCombination } from '../../lib/change';

const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case newCards.type:
      const deck = new PlayingCards();
      const { cards: hand1, restCards } = getNCardsAndRest(deck, 5, 0);
      const { cards: hand2, restCards: rest } = getNCardsAndRest(restCards, 5, 0);
      const [combination1, combination2] = [PokerHandRate(hand1), PokerHandRate(hand2)];
      const counter1 = 0;
      const counter2 = 0;
      const change = false;
      const show = false;
      return {
        hand1,
        combination1,
        counter1, // to check if over 3 for change
        hand2,
        combination2,
        counter2,
        rest,
        change,
        show,
      };
    case toggleCard.type:
      // const { hand, id } = toggleCard().payload;  gia apofygh tou toggleCard().paylod polles fores
      return action.payload.hand === 1
        ? {
          ...state,
          hand1: {
            ...state.hand1,
            cards: state.hand1.cards.map(el => (el.id === action.payload.id ? { ...el, toggled: !el.toggled } : { ...el })),
          },
        }
        : {
          ...state,
          hand2: {
            ...state.hand2,
            cards: state.hand2.cards.map(el => (el.id === action.payload.id ? { ...el, toggled: !el.toggled } : { ...el })),
          },
        };
    case changeCards.type:
      if (!state.change) {
        action.payload.id === 1
          ? ((state.counter1 = 0),
          state.hand1.cards.forEach((el) => {
            if (el.toggled === true) state.counter1++;
          }))
          : ((state.counter2 = 0),
          state.hand2.cards.forEach((el) => {
            if (el.toggled === true) state.counter2++;
          }));
        if (action.payload.id === 1) {
          if (state.counter1 === 0) alert('Select at max 3 cards to change 1');
          else if (state.counter1 > 3) alert(`You selected ${state.counter1} cards.Please select max 3 1`);
          else {
            // alert('Player1 cards changed');
            const {
              hand1: newHand,
              combination1: newCombination,
              restCards: newRestCards,
            } = changeSelected(state, action.payload.id);
            return {
              ...state,
              hand1: newHand,
              combination1: newCombination,
              counter1: 0,
              rest: newRestCards,
              change: true,
            };
          }
        } else if (state.counter2 === 0) alert('Select at max 3 cards to change 2');
        else if (state.counter2 > 3) alert(`You selected ${state.counter2} cards.Please select max 3 2`);
        else {
          // alert('Player2 cards changed');
          const {
            hand2: newHand,
            combination2: newCombination,
            restCards: newRestCards,
          } = changeSelected(state, action.payload.id);
          return {
            ...state,
            hand2: newHand,
            combination2: newCombination,
            counter2: 0,
            rest: newRestCards,
            change: true,
          };
        }
        return state;
      }
      // console.log(state.rest);
      // action.payload.id===1 ?  state.counter1<=3 ? return changeSelected(state, action.payload.id) : return changeSelected(state, action.payload.id);
      return state;
    case changeBest.type:
      if (!state.show) {
        const { newCards: changeNewCards, combination: newCombination, restCards: newRestCards } = action.payload.id === 1
          ? changeBestCombination(state.hand1, state.combination1, state.rest)
          : changeBestCombination(state.hand2, state.combination2, state.rest);
        return action.payload.id === 1
          ? {
            ...state,
            hand1: { ...changeNewCards },
            combination1: newCombination,
            rest: { ...newRestCards },
            change: true,
            show: true,
          }
          : {
            ...state,
            hand2: { ...changeNewCards },
            combination2: newCombination,
            rest: { ...newRestCards },
            change: true,
            show: true,
          };
      }
      return state;
    // changeBestCombination(state.hand1.cards, state.combination1, state.rest);
    // return state;
    default:
      return state;
  }
};

export default dataReducer;

const changeSelected = (state, id) => {
  const counter = id === 1 ? state.counter1 : state.counter2;
  const { cards: hand, restCards } = getNCardsAndRest(state.rest, counter, 0);
  const arr = [...hand.cards]; // because of deepFreze
  const newHand = id === 1
    ? new PlayingCards(state.hand1.cards.map(el => (el.toggled ? { ...arr.pop() } : { ...el })))
    : new PlayingCards(state.hand2.cards.map(el => (el.toggled ? { ...arr.pop() } : { ...el })));
  const newCombination = PokerHandRate(newHand);
  return id === 1
    ? {
      hand1: newHand,
      combination1: newCombination,
      restCards,
    }
    : {
      hand2: newHand,
      combination2: newCombination,
      restCards,
    };
};

// mhn afhnei kai allo show
// changeSelected se lib
// index
// [,is]
// function gia chan
