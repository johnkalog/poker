const handScore = (combination) => {
  switch (combination) {
    case 'RoyalFlush':
      return 100;
    case 'StraightFlush':
      return 90;
    case 'FourOfAKind':
      return 80;
    case 'FullHouse':
      return 70;
    case 'Flush':
      return 60;
    case 'Straight':
      return 50;
    case 'ThreeOfAKind':
      return 40;
    case 'TwoPair':
      return 30;
    case 'OnePair':
      return 20;
    case 'HighCard':
      return 10;
    default:
      return 0;
  }
};

export default handScore;
