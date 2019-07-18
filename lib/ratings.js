// by Dimitris Livas
import _ from 'lodash';

// Example implementation used in the Think Functional course
function deepFreeze(object) {
  if (typeof object !== 'object') {
    return object;
  }
  Object.freeze(object);

  Object.values(object).forEach(property => deepFreeze(property));

  return object;
}

function groupBy(option) {
  return _.groupBy(this, option);
}

function sortBy(option) {
  return _.sortBy(this, option);
}

function flatten() {
  // se ena epipedo
  return _.flatten(this);
}

function maxInARow(nums) {
  // function maxInARow() {return _.chain(this)
  return _.chain(nums) // me nums. den ginetai
    .sortBy() // this gia left of the dot _chain to apotelesma orisma sthn epomenh
    .uniq()
    .map((num, i) => num - i)
    .groupBy() // megista se seira
    .orderBy('length') // orderBy epilegeis kai asc h desc to allo exei default ascending
    .last() // lodash
    .value().length; // paei mazi me chain
}

//
// Playing Cards class definition and implementation
// in a functional fashiom
//
const Ranks = Object.freeze(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']);
const Suits = Object.freeze(['hearts', 'clubs', 'diams', 'spades']);
const Comparisons = Object.freeze([
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
]);

const Cards = Object.entries(Ranks).reduce(
  (cards, [weight, rank]) => {
    const comparison = Comparisons[weight];
    return [
      ...cards,
      ...Suits.map(suit => ({
        rank,
        suit,
        weight,
        comparison,
      })),
    ];
  }, // ...cards gia na kanei spread
  [],
);

// console.log(Cards);
// const Cards = Object.entries(Ranks).reduce(
//   (cards, [ weight, rank ]) =>
//     cards.concat(Suits.map(suit => ({ rank, suit, weight }))),
//     []
// );

// console.log('cs: ', Cards);

deepFreeze(Cards);
export class PlayingCards {
  constructor(cards = null, from = 0, to = 0, firstid = 0) {
    // h parinas tis cards alliws ftiaxnei auto
    const cardsSource = cards instanceof Array ? cards : _.shuffle(Cards); // oxi copy logw deepFreeze den allazei to Cards
    const cardsRange = cardsSource.slice(from, to || cardsSource.length); // new with slice an den uparxoun alla exei teleiwsei h trapoula?

    // if cards==null only then shuffle kalutera ? etsi komle giati meta to button na mhn emfanizontai idia
    this.id = firstid;
    this.cards = cardsRange.map(el => ({ ...el, toggled: false, id: this.id++ })); // pio poly shmasia to epanw?
    // this.cards = cardsRange.sort(() => Math.random() - 0.5);

    this.orderedCards = [...this.cards].sort((a, b) => a.weight - b.weight);
    this.ranks = _.groupBy(this.orderedCards, 'rank'); // this.orderedCards::groupBy('rank');
    this.suits = _.groupBy(this.orderedCards, 'suit'); // returns object if it was array of objects then the under line would search the length property to the whole object
    this.rankTimes = _.groupBy(this.ranks, 'length');
    this.suitTimes = _.groupBy(this.suits, 'length');
    this.maxInARow = maxInARow(this.orderedCards.map(({ weight }) => weight));

    deepFreeze(this);
  }
}
// this.maxInARow = this.orderedCards
//   .map(({ weight }) => weight)
//   ::maxInARow();

export const getNCardsAndRest = (pcards, n, firstid) =>
  // pairnei kartes epistrefei tis upoloipes apo trapoula
  ({
    cards: new PlayingCards(pcards.cards, 0, n, firstid),
    restCards: new PlayingCards(pcards.cards, n, pcards.cards.length), // kratame ola ta stigmiotupa sthn diarkeia tou paixnidiou
  });
const getOfSameRank = (pcards, n) => pcards.rankTimes[n] || []; // exei n idia rank

const getOfSameSuit = (pcards, n) => pcards.suitTimes[n] || [];

const hasAce = pcards => !!pcards.ranks.A;

const hasOfSameRank = (pcards, n) => getOfSameRank(pcards, n).length; // returns the length of the n same cards cpx exw 3-2ades h kai alla

const hasOfSameSuit = (pcards, n) => getOfSameSuit(pcards, n).length;

const hasInARow = (pcards, n) => pcards.maxInARow >= n;

const getWorstSingles = pcards => _.sortBy(_.flatten(getOfSameRank(pcards, 1)), 'weight'); // in ascending order the sigle cards by their weight.

// this.getOfSameRank(1)::flatten()::sortBy('weight');

//
// Poker Ratings
//
const PokerRating = {
  RoyalFlush: hand => hasInARow(hand, 5) && hasOfSameSuit(hand, 5) && hasAce(hand),
  StraightFlush: hand => hasInARow(hand, 5) && hasOfSameSuit(hand, 5),
  FourOfAKind: hand => hasOfSameRank(hand, 4),
  FullHouse: hand => hasOfSameRank(hand, 3) && hasOfSameRank(hand, 2),
  Flush: hand => hasOfSameSuit(hand, 5),
  Straight: hand => hasInARow(hand, 5),
  ThreeOfAKind: hand => hasOfSameRank(hand, 3),
  TwoPair: hand => hasOfSameRank(hand, 2) >= 2,
  OnePair: hand => hasOfSameRank(hand, 2),
  HighCard: hand => hasOfSameRank(hand, 1) >= 5, // ola ta 5 einai diaforetika metaksu tous
};

deepFreeze(PokerRating);

export const PokerHandRate = (cards) => {
  const [rating] = Object.entries(PokerRating).find(([rate, is]) => is(cards)); // kai me [,is]
  return rating;
};

//
// Tests
//
// Ranks = Object.freeze([ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]);
// Suits = Object.freeze([ 'hearts', 'clubs', 'diams', 'spades' ]);

// const [ H, C, D, S ] = Suits;
// const c = ( weight, suit) => ({ rank: Ranks[weight], suit, weight });
//
// const hand = [
//   [ c(12, H), c(8, H), c(12, C), c(8, C), c(7, S), c(12, D) ],
//   [ c(12, H), c(12, D), c(12, C), c(8, C), c(12, S), c(6, D) ],
//   [ c(12, H), c(8, H), c(11, H), c(10, H), c(9, H), c(9, C) ],
//   [ c(12, H), c(8, H), c(12, C), c(6, C), c(7, S), c(7, D) ],
// ];
