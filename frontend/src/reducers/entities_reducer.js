import { combineReducers } from "redux";
import chores from "./chores_reducer"

const EntitiesReducer = combineReducers({
  chores
});

export default EntitiesReducer;
