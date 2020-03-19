import { RECEIVE_BILL, RECEIVE_BILLS } from "../actions/bill_actions";

const BillsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_BILL:
            return Object.assign({}, state, { [action.bill.id]: action.bill });
        case RECEIVE_BILLS:
            action.bills.data.forEach( bill => (nextState[bill._id] = bill));
            return nextState;
        default:
            return state;
    }
}

export default BillsReducer;