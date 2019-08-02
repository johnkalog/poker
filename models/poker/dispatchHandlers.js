// handlers

import {
  newCards, newRound, toggleCard, changeCards, changeBest,
} from './actions';

const onNewClick = dispatch => ({
  onNewClick: () => {
    dispatch(newCards());
  },
});

const onRoundClick = dispatch => ({
  onRoundClick: () => {
    dispatch(newRound());
  },
});

const onCardClick = dispatch => ({
  onCardClick: (hand, id) => {
    dispatch(toggleCard(hand, id));
  },
});

const onChangeClick = dispatch => ({
  onChangeClick: (id) => {
    dispatch(changeCards(id));
  },
});

const onShowClick = dispatch => ({
  onShowClick: (id) => {
    dispatch(changeBest(id));
  },
});

export {
  onNewClick, onRoundClick, onCardClick, onChangeClick, onShowClick,
};
