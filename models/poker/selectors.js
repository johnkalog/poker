const hand1 = ({ data }) => ({
  hand1: data.hand1,
});

const hand2 = ({ data }) => ({
  hand2: data.hand2,
});

const cards = (state, ownProps) => (ownProps.id === 1 ? { cards: state.data.hand1.cards } : { cards: state.data.hand2.cards }); // or the condition at the mapStatettoProps

const comb = (state, ownProps) => (ownProps.id === 1 ? { comb: state.data.combination1 } : { comb: state.data.combination2 });

export {
  hand1, hand2, cards, comb,
};
