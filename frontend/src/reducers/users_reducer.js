import { RECEIVE_USERS, REMOVE_USER, RECEIVE_USER } from '../actions/user_actions';

const HouseholdsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_USERS:
      newState = {}
      action.users.data.forEach(user => (newState[user._id] = user));
      return newState;
    case RECEIVE_USER:
      newState[action.user.data._id] = action.user.data;
      return newState;
    case REMOVE_USER:
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};

export default HouseholdsReducer;