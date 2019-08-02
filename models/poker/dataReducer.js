import _ from 'lodash';
import {
  newCards, newRound, toggleCard, changeCards, changeBest,
} from '.';
import { changeBestCombination } from '../../lib/change';
import handScore from '../../lib/scores';
import newInfo from '../../lib/hands';
import changeSelected from '../../lib/selected';

const generateInitState = () => ({
  ...newInfo(),
  score1: 0,
  score2: 0,
  roundCounter: 1,
  nextRound: false,
});

const dataReducer = (state = generateInitState(), action) => {
  switch (action.type) {
    case newCards.type: {
      return generateInitState();
    }

    case newRound.type: {
      return state.nextRound && state.roundCounter < 7
        ? {
          ...state,
          ...newInfo(),
          roundCounter: ++state.roundCounter,
          nextRound: false,
        }
        : state;
    }

    case toggleCard.type: {
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
    }

    case changeCards.type: {
      if (state.change) return state;

      const cards = action.payload.id === 1 ? state.hand1.cards : state.hand2.cards;
      const counter = cards.filter(item => item.toggled === true).length;

      if (counter === 0) alert('Select at max 3 cards to change 1');
      else if (counter > 3) alert(`You selected ${counter} cards.Please select max 3`);
      else {
        return {
          ...state,
          ...changeSelected(state, action.payload.id, counter),
          change: true,
        };
      }
    }

    case changeBest.type: {
      if (state.show) return state;

      const { newCards, combination, restCards } = changeBestCombination(
        state.hand1,
        state.combination1,
        state.rest,
      );

      return {
        ...state,
        hand1: { ...newCards },
        combination1: combination,
        score1: state.score1 + handScore(state.combination1),
        score2: state.score2 + handScore(state.combination2),
        rest: { ...restCards },
        change: true,
        show: true,
        nextRound: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default dataReducer;

// ( destructuring
// {}
// considitonal rendering error
// if mikrotero sthn arxh
// array gia allagh kartwn oxi toggled ligotera data sto state
// sto state mono oti gia components
// change san maptoprops kai if se cmponent
// checkbox otan allaksei
// ternary gia return
// notifications array state
// changeSelected se lib
// sto state oti eksartatai apo prohgoumeno action
