import { RECEIVE_CHORES, RECEIVE_NEW_CHORE } from "../actions/chore_actions";

const ChoresReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CHORES:
      action.chores.data.forEach(chore => (nextState[chore._id] = chore));
      return nextState;
    case RECEIVE_NEW_CHORE:
      nextState[action.chore.data._id] = action.chore.data;
      return nextState;
    default:
      return state;
  }
};

export default ChoresReducer;
