import { PlayingCards, PokerHandRate, getNCardsAndRest } from './ratings';

const newInfo = () => {
  const deck = new PlayingCards();
  const { cards: hand1, restCards } = getNCardsAndRest(deck, 5, 0);
  const { cards: hand2, restCards: rest } = getNCardsAndRest(restCards, 5, 0);
  const [combination1, combination2] = [PokerHandRate(hand1), PokerHandRate(hand2)];
  const change = false;
  const show = false;
  return {
    hand1,
    combination1,
    hand2,
    combination2,
    rest,
    change,
    show,
  };
};

export default newInfo;
