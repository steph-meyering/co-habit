import { RECEIVE_BILLS, RECEIVE_BILL } from "../actions/bill_actions";
import { RECEIVE_USERS } from "../actions/user_actions";
import { UPDATE_PIE_CHART } from "../actions/pie_chart_actions";

const PieChartReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign([], state);
    switch (action.type) {
      case UPDATE_PIE_CHART:
        return action.data;
      case RECEIVE_BILL:
        nextState.forEach(obj => {
          if (obj.userId === action.bill.data.user) {
            obj.value += action.bill.data.amount;
          }
        });
        return nextState;
      default:
        return state;
    }
};

export default PieChartReducer;