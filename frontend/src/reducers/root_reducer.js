import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import bills from './bills_reducer'

const RootReducer = combineReducers({
    session,
    errors,
    bills
});

export default RootReducer;