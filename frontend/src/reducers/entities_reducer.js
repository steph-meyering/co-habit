import { combineReducers } from "redux";
import households from "./households_reducer";
import chores from "./chores_reducer";
import users from "./users_reducer";
import bills from "./bills_reducer";
import events from "./events_reducer";

const EntitiesReducer = combineReducers({
  households,
  chores,
  users,
  bills,
  events
});

export default EntitiesReducer;
