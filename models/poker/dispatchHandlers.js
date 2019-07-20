import {
  newCards, toggleCard, changeCards, changeBest,
} from './actions';

const onNewClick = dispatch => ({
  onNewClick: () => {
    dispatch(newCards());
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
  onNewClick, onCardClick, onChangeClick, onShowClick,
};
