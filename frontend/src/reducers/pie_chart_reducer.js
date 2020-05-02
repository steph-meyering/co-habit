import { REMOVE_BILL, RECEIVE_BILL } from "../actions/bill_actions";
import { UPDATE_PIE_CHART } from "../actions/pie_chart_actions";

const PieChartReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = Object.assign([], state);
  switch (action.type) {
    case UPDATE_PIE_CHART:
      return action.data;
    case RECEIVE_BILL:
      nextState.forEach((user) => {

        // iterate through users in household to find owner of incoming bill
        if (user.userId === action.bill.data.user) {

          // check if the user already has a bill with the same id as incoming 
          // bill. If so, we are actually editing a bill and want to subtract
          // the bill's previous value from it's owner's total in pie chart state
          if (user.bills[action.bill.data._id]){             
            user.value -= user.bills[action.bill.data._id];
          }

          // add bill value to pie chart's state total
          user.value += action.bill.data.amount;
          user.bills[action.bill.data._id] = action.bill.data.amount;
        }
      });
      return nextState;
    case REMOVE_BILL:
      nextState.forEach((user) => {
        if (user.userId === action.bill.user) {
          user.value -= action.bill.amount;
          delete user.bills[action.bill._id];
        }
      });
      return nextState;
    default:
      return state;
  }
};

export default PieChartReducer;
