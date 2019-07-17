// action creators

const NEW_CARDS = 'NEW_CARDS';

const newCards = () => ({
  // type gia na elegxoume oxi apo action
  type: 'NEW_CARDS',
});

newCards.type = NEW_CARDS;

const TOGGLE_CARD = 'TOGGLE_CARD';

const toggleCard = (hand, id) => ({
  type: 'TOGGLE_CARD',
  payload: {
    hand,
    id,
  },
});

toggleCard.type = TOGGLE_CARD;

const CHANGE_CARDS = 'CHANGE_CARDS';

const changeCards = id => ({
  type: 'CHANGE_CARDS',
  payload: {
    id,
  },
});

changeCards.type = 'CHANGE_CARDS';

export { newCards, toggleCard, changeCards };
