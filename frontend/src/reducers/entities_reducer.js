import { combineReducers } from "redux";
import households from "./households_reducer";
import chores from "./chores_reducer";
const EntitiesReducer = combineReducers({
  households,
  chores
});

export default EntitiesReducer;
