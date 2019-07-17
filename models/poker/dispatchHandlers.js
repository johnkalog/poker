import { newCards, toggleCard, changeCards } from './actions';

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

export { onNewClick, onCardClick, onChangeClick };
