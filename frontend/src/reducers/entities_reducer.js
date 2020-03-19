import { combineReducers } from "redux";
import households from "./households_reducer";
import chores from "./chores_reducer";
import bills from "./bills_reducer"

const EntitiesReducer = combineReducers({
  households,
  chores,
  bills
});

export default EntitiesReducer;
