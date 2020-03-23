import {
    RECEIVE_BILL_ERRORS,
} from '../actions/bill_actions';

const _nullErrors = [];

const BillErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BILL_ERRORS:
            return action.errors;
        default:
            return state;
    }
};

export default BillErrorsReducer;