import {
  newCards, toggleCard, changeCards, changeBest,
} from './actions';
import {
  onNewClick, onCardClick, onChangeClick, onShowClick,
} from './dispatchHandlers';
import {
  hand1, hand2, cards, comb,
} from './selectors';
import reducer from './reducer';

export {
  newCards, toggleCard, changeCards, changeBest,
};
export {
  onNewClick, onCardClick, onChangeClick, onShowClick,
};
export {
  hand1, hand2, cards, comb,
};
export { reducer };
