import _ from 'lodash';
import { PlayingCards, PokerHandRate, getNCardsAndRest } from '../../lib/ratings';
import {
  newCards, newRound, toggleCard, changeCards, changeBest,
} from '.';
import { changeBestCombination } from '../../lib/change';
import handScore from '../../lib/scores';
import newInfo from '../../lib/hands';

const dataReducer = (state = {}, action) => {
  let hand1;
  let combination1;
  let counter1;
  let score1;
  let hand2;
  let combination2;
  let counter2;
  let score2;
  let rest;
  let change;
  let show;
  let roundCounter;
  let nextRound; // mporei na ksanapathsei newRound mono meta show
  switch (action.type) {
    case newCards.type:
      ({
        hand1, combination1, counter1, hand2, combination2, counter2, rest, change, show,
      } = {
        ...newInfo(),
      });
      score1 = 0;
      score2 = 0;
      roundCounter = 1;
      nextRound = false;
      return {
        hand1,
        combination1,
        counter1, // to check if over 3 for change
        score1,
        hand2,
        combination2,
        counter2,
        score2,
        rest,
        change,
        show,
        roundCounter,
        nextRound,
      };
    case newRound.type:
      if (state.nextRound && state.roundCounter < 7) {
        ({
          hand1, combination1, counter1, hand2, combination2, counter2, rest, change, show,
        } = {
          ...newInfo(),
        });
        return {
          ...state,
          hand1,
          combination1,
          counter1,
          hand2,
          combination2,
          counter2,
          rest,
          change,
          show,
          roundCounter: ++state.roundCounter,
          nextRound: false,
        };
      }
      return state;
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
          else if (state.counter1 > 3) alert(`You selected ${state.counter1} cards.Please select max 3`);
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
        else if (state.counter2 > 3) alert(`You selected ${state.counter2} cards.Please select max 3`);
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
            score1: state.score1 + handScore(state.combination1),
            score2: state.score2 + handScore(state.combination2),
            rest: { ...newRestCards },
            change: true,
            show: true,
            nextRound: true,
          }
          : {
            ...state,
            hand2: { ...changeNewCards },
            combination2: newCombination,
            score1: state.score1 + handScore(state.combination1),
            score2: state.score2 + handScore(state.combination2),
            rest: { ...newRestCards },
            change: true,
            show: true,
            nextRound: true,
          };
      }
      return state;
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

// ( destructuring
