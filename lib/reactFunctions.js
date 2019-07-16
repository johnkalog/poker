export const getEntity = (suit) => {
  switch (suit) {
    case 'hearts':
      return String.fromCharCode(9829);
    case 'clubs':
      return String.fromCharCode(9827);
    case 'diams':
      return String.fromCharCode(9830);
    case 'spades':
      return String.fromCharCode(9824);
  }
};
