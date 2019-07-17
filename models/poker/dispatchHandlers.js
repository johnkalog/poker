import { newCards, toggleCard } from './actions';

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

export { onNewClick,onCardClick };
