const actionCreator = (type) => {
  const action = payload => ({
    type,
    payload,
  });
  action.type = type;
  return action;
};

export default actionCreator; // returns the action and the type is also in the function for t.type
