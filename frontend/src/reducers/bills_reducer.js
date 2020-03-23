import {
  RECEIVE_BILL,
  RECEIVE_BILLS,
  REMOVE_BILL
} from "../actions/bill_actions";
import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";

const BillsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_BILL:
      nextState[action.bill.data._id] = action.bill.data;
      return nextState;
    case RECEIVE_BILLS:
      action.bills.data.forEach(bill => (nextState[bill._id] = bill));
      return nextState;
    case REMOVE_BILL:
      delete nextState[action.bill._id];
      return nextState;
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default BillsReducer;
