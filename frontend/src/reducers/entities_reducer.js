import { combineReducers } from "redux";
import households from "./households_reducer";
import chores from "./chores_reducer";
import users from "./users_reducer";
const EntitiesReducer = combineReducers({
  households,
  chores,
  users
});

export default EntitiesReducer;
