import { changeBest } from '.';

const showReducer = (state = false, action) => {
  switch (action.type) {
    case changeBest.type:
      return true;
    default:
      return state;
  }
};

export default showReducer;
