// action creators

const NEW_CARDS = 'NEW_CARDS';

const newCards = () => ({
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

export { newCards, toggleCard };
