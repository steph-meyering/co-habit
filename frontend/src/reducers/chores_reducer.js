import { RECEIVE_CHORES, RECEIVE_NEW_CHORE } from "../actions/chore_actions";

const ChoresReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CHORES:
      nextState = action.chores.data;
      return nextState;
    case RECEIVE_NEW_CHORE:
      nextState[action.chore.id] = action.chore;
      return nextState;
    default:
      return state;
  }
};

export default ChoresReducer;
