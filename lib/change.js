import _ from 'lodash';
import { PlayingCards, PokerHandRate, getNCardsAndRest } from './ratings.js';

export const changeBestCombination = (hand, combination, rest) => {
  // const example = new PlayingCards([
  //   {
  //     comparison: 'm',
  //     id: 0,
  //     rank: '6',
  //     suit: 'hearts',
  //     toggled: false,
  //     weight: '4',
  //   },
  //   {
  //     comparison: 'm',
  //     id: 0,
  //     rank: '3',
  //     suit: 'spades',
  //     toggled: false,
  //     weight: '1',
  //   },
  //   {
  //     comparison: 'm',
  //     id: 0,
  //     rank: '2',
  //     suit: 'spades',
  //     toggled: false,
  //     weight: '0',
  //   },
  //   {
  //     comparison: 'm',
  //     id: 0,
  //     rank: '8',
  //     suit: 'spades',
  //     toggled: false,
  //     weight: '6',
  //   },
  //   {
  //     comparison: 'm',
  //     id: 0,
  //     rank: '9',
  //     suit: 'spades',
  //     toggled: false,
  //     weight: '7',
  //   },
  // ]);
  // const com = PokerHandRate(example);
  // console.log(hand, com);
  // console.log(cards, combination);
  let counter = 0;
  let newCards;
  let arr;
  let a;
  let b;
  let best;
  let flag;
  switch (combination) {
    case 'TwoPair':
      [a, b] = Object.values(hand.ranks)
        .filter(el => el.length === 2)
        .map(el => _.head(el).weight);
      hand.cards.forEach((el) => {
        if (el.weight !== a && el.weight !== b && el.weight < 8) counter++;
      });
      const { cards: handTwo, restCards: restCardsTwo } = getNCardsAndRest(rest, counter, 0);
      arr = [...handTwo.cards];
      newCards = new PlayingCards(
        hand.cards.map(el => (el.weight !== a && el.weight !== b && el.weight < 8 ? { ...arr.pop() } : { ...el })),
      );
      return { newCards, combination: PokerHandRate(newCards), restCards: restCardsTwo };
    case 'OnePair':
      const others = Object.values(hand.ranks)
        .filter(el => el.length !== 2)
        .map(el => _.head(el).weight);
      best = Math.max(...others);
      const pair = hand.cards.find(el => !others.includes(el.weight)).weight; // this at pair
      flag = false; // 3 change
      counter = best < 8 ? 3 : ((flag = true), 2);
      const { cards: handOne, restCards: restCardsOne } = getNCardsAndRest(rest, counter, 0);
      arr = [...handOne.cards];
      newCards = new PlayingCards(
        hand.cards.map(el => (el.weight !== pair && (!flag || (flag && el.weight !== best.toString()))
          ? { ...arr.pop() }
          : { ...el })),
      );
      return { newCards, combination: PokerHandRate(newCards), restCards: restCardsOne };
    case 'HighCard':
      best = Math.max(...Object.values(hand.ranks).map(el => _.head(el).weight));
      console.log(best, 'HighCard');
      flag = false;
      counter = best < 8 ? 5 : ((flag = true), 4);
      const { cards: handHigh, restCards: restCardsHigh } = getNCardsAndRest(rest, counter, 0);
      arr = [...handHigh.cards];
      newCards = new PlayingCards(
        hand.cards.map(el => (!flag || (flag && el.weight !== best.toString()) ? { ...arr.pop() } : { ...el })),
      );
      console.log(flag, newCards);
      return { newCards, combination: PokerHandRate(newCards), restCards: restCardsHigh };
    default:
      return { newCards: hand, combination, restCards: rest };
  }
};
