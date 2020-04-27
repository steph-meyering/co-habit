import { REMOVE_BILL, RECEIVE_BILL } from "../actions/bill_actions";
import { UPDATE_PIE_CHART } from "../actions/pie_chart_actions";

const PieChartReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign([], state);
    switch (action.type) {
        case UPDATE_PIE_CHART:
            return action.data;
        case RECEIVE_BILL:
            nextState.forEach(user => {
            if (user.userId === action.bill.data.user) {
                user.value -= user.bills[action.bill.data._id];
                user.value += action.bill.data.amount;
                user.bills[action.bill.data._id] = action.bill.data.amount;
            }
            });
            return nextState;
        case REMOVE_BILL:
            nextState.forEach(user => {
            if (user.userId === action.bill.user) {
                user.value -= action.bill.amount;
            }
            });
            return nextState;
        default:
            return state;
    }
};

export default PieChartReducer;