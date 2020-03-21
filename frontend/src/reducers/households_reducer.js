import { RECEIVE_HOUSEHOLD, RECEIVE_HOUSEHOLDS } from '../actions/household_actions';

const HouseholdsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_HOUSEHOLDS:
      action.households.data.forEach(household => (newState[household._id] = household));
      return newState;
    case RECEIVE_HOUSEHOLD:
      newState[action.household.data._id] = action.household.data;
      return newState;
    default:
      return state;
  }
};

export default HouseholdsReducer;