const hand1 = ({ hand1 }) => ({
  hand1,
});

const hand2 = ({ hand2 }) => ({
  hand2,
});

const cards = (state, ownProps) => (ownProps.id === 1 ? { cards: state.hand1.cards } : { cards: state.hand2.cards }); // or the condition at the mapStatettoProps

const comb = (state, ownProps) => (ownProps.id === 1 ? { comb: state.combination1 } : { comb: state.combination2 });

const show = ({ show }) => ({
  show,
});

export {
  hand1, hand2, cards, comb, show,
};
