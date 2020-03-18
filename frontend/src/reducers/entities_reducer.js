import { combineReducers } from 'redux';
import households from './households_reducer';

const EntitiesReducer = combineReducers({
  households
});

export default EntitiesReducer;