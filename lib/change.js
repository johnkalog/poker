import _ from 'lodash';
import { PlayingCards, PokerHandRate, getNCardsAndRest } from './ratings.js';

export const changeBestCombination = (cards, combination, rest) => {
  const example = new PlayingCards([
    {
      comparison: 'm',
      id: 0,
      rank: '6',
      suit: 'hearts',
      toggled: false,
      weight: '4',
    },
    {
      comparison: 'm',
      id: 0,
      rank: '3',
      suit: 'spades',
      toggled: false,
      weight: '1',
    },
    {
      comparison: 'm',
      id: 0,
      rank: '6',
      suit: 'spades',
      toggled: false,
      weight: '4',
    },
    {
      comparison: 'm',
      id: 0,
      rank: 'J',
      suit: 'spades',
      toggled: false,
      weight: '11',
    },
    {
      comparison: 'm',
      id: 0,
      rank: '9',
      suit: 'spades',
      toggled: false,
      weight: '7',
    },
  ]);
  const com = PokerHandRate(example);
  // console.log(example, com);
  // console.log(cards, combination);
  let counter = 0;
  let newCards;
  let arr;
  let a;
  let b;
  let c;
  switch (com) {
    case 'TwoPair':
      [a, b] = Object.values(example.ranks)
        .filter(el => el.length === 2)
        .map(el => _.head(el).weight);
      example.cards.forEach((el) => {
        if (el.weight !== a && el.weight !== b && el.weight < 8) counter++;
      });
      const { cards: handTwo, restCards: restCardsTwo } = getNCardsAndRest(rest, counter, 0);
      arr = [...handTwo.cards];
      newCards = new PlayingCards(
        example.cards.map(el => (el.weight !== a && el.weight !== b && el.weight < 8 ? { ...arr.pop() } : { ...el })),
      );
      return { newCards, combination: PokerHandRate(newCards), restCards: restCardsTwo };
    case 'OnePair':
      const others = Object.values(example.ranks)
        .filter(el => el.length !== 2)
        .map(el => _.head(el).weight);
      const best = Math.max(...others);
      const pair = example.cards.find(el => !others.includes(el.weight)).weight; // this at pair
      let flag = false; // 3 change
      counter = best < 8 ? 3 : ((flag = true), 2);
      console.log(best);
      const { cards: handOne, restCards: restCardsOne } = getNCardsAndRest(rest, counter, 0);
      arr = [...handOne.cards];
      newCards = new PlayingCards(
        example.cards.map((el) => {
          console.log(el.weight !== pair && (!flag || (flag && el.weight !== best)), el.weight);
          return el.weight !== pair && (!flag || (flag && el.weight !== best))
            ? { ...arr.pop() }
            : { ...el };
        }),
      );
      console.log(counter, flag);
      console.log(a, b, c, 'OnePair');
      return { newCards, combination: PokerHandRate(newCards), restCards: restCardsOne };
    case 'HighCard':
      console.log('HighCard');
      break;
    default:
      return { cards, combination, rest };
  }
};
