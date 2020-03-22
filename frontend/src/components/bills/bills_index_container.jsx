import { fetchBills, deleteBill, updateBill } from "../../actions/bill_actions";
import { connect } from 'react-redux';
import BillsIndex from "./bills_index";
import { getAcceptedUsers } from "../../actions/user_actions";
import { updatePieChart } from "../../actions/pie_chart_actions";

const mSTP = state => {
    return {
      bills: Object.values(state.entities.bills),
      currentUser: state.session.user,
      housemates: state.entities.users,
      pieChart: state.entities.pieChart
    };
}

const mDTP = dispatch => {
    return({
        getAcceptedUsers: householdId => dispatch(getAcceptedUsers(householdId)),
        fetchBills: () => dispatch(fetchBills()),
        deleteBill: (bill) => dispatch(deleteBill(bill)),
        updateBill: (bill) => dispatch(updateBill(bill)),
        updatePieChart: (data) => dispatch(updatePieChart(data))
    })
}


export default connect(mSTP, mDTP)(BillsIndex);