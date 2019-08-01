import {
  newCards, newRound, toggleCard, changeCards, changeBest,
} from './actions';
import {
  onNewClick,
  onRoundClick,
  onCardClick,
  onChangeClick,
  onShowClick,
} from './dispatchHandlers';
import {
  hand1, score1, hand2, score2, cards, comb, show, roundCounter,
} from './selectors';
import dataReducer from './dataReducer';
import showReducer from './showReducer';

export {
  newCards, newRound, toggleCard, changeCards, changeBest,
};
export {
  onNewClick, onRoundClick, onCardClick, onChangeClick, onShowClick,
};
export {
  hand1, score1, hand2, score2, cards, comb, show, roundCounter,
};
export { dataReducer, showReducer };
