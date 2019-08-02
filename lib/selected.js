import { PlayingCards, PokerHandRate, getNCardsAndRest } from './ratings';

const changeSelected = (state, id, counter) => {
  const { cards: hand, restCards } = getNCardsAndRest(state.rest, counter, 0);
  const arr = [...hand.cards]; // because of deepFreze
  const newHand = id === 1
    ? new PlayingCards(state.hand1.cards.map(el => (el.toggled ? { ...arr.pop() } : { ...el })))
    : new PlayingCards(state.hand2.cards.map(el => (el.toggled ? { ...arr.pop() } : { ...el })));
  const newCombination = PokerHandRate(newHand);

  return {
    [`hand${id}`]: newHand,
    [`combination${id}`]: newCombination,
    rest: restCards,
  };

  return id === 1
    ? {
      hand1: newHand,
      combination1: newCombination,
      rest: restCards,
    } : {
      hand2: newHand,
      combination2: newCombination,
      rest: restCards,
    };
};

export default changeSelected;
