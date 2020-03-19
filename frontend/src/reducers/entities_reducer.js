import { combineReducers } from "redux";
import households from "./households_reducer";
import chores from "./chores_reducer";
import users from "./users_reducer";
import bills from "./bills_reducer";

const EntitiesReducer = combineReducers({
  households,
  chores,
  users,
  bills
});

export default EntitiesReducer;
