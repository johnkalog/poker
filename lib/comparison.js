import _ from 'lodash';
import { PlayingCards, PokerHandRate } from './ratings.js';

const PokerRatingNumber = {
  RoyalFlush: 'J',
  StraightFlush: 'I',
  FourOfAKind: 'H',
  FullHouse: 'G',
  Flush: 'F',
  Straight: 'E',
  ThreeOfAKind: 'D',
  TwoPair: 'C', // ayth poy perisseuei
  OnePair: 'B', // tis duo mikroteres h oles an katw pao to 10
  HighCard: 'A', // kai tis 4 ektos an oles katw apo kapoio ficed
};

const PokerHandRateNumber = (myRate) => {
  // caculate Rate number
  const [, identity] = Object.entries(PokerRatingNumber).find(([rate]) => myRate === rate);
  return identity;
};

const rateNumber = cards => PokerHandRateNumber(PokerHandRate(cards));

const stringComparison = (cards, rate) => {
  const arr = _.orderBy(
    _.values(_.groupBy(cards, 'comparison')),
    ['length', el => _.head(el).comparison],
    ['desc', 'desc'],
  );
  let str = rate;
  arr.forEach((el) => {
    str += `${el.length}${_.head(el).comparison}`;
  });
  return str;
};

export const determineWinner = (cards1, cards2) => {
  const rate1 = rateNumber(cards1);
  const rate2 = rateNumber(cards2);
  if (rate1 === rate2) {
    const comparisonModel1 = stringComparison(cards1.cards, rate1);
    const comparisonModel2 = stringComparison(cards2.cards, rate2); // ascending order?
    // console.log(comparisonModel1,comparisonModel2);
    if (comparisonModel1 === comparisonModel2) {
      return 0;
    }
    return comparisonModel1 > comparisonModel2 ? 1 : 2;
  }
  return rate1 > rate2 ? 1 : 2; // an den isxuei to prin edw erxetai
};
