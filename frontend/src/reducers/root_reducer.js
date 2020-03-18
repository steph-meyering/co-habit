import { combineReducers } from 'redux';
import session from './session_reducer';
import chores from "./chores_reducer"
import errors from './errors_reducer'

const RootReducer = combineReducers({
    session,
    chores,
    errors
});

export default RootReducer;