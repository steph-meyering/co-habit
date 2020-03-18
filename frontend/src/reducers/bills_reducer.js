import { RECEIVE_BILL, RECEIVE_BILLS } from "../actions/bill_actions";

const BillsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BILL:
            return Object.assign({}, state, { [action.bill.id]: action.bill });
        case RECEIVE_BILLS:
            return action.bills;
        default:
            return state;
    }
}

export default BillsReducer;