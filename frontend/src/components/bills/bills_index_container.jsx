import { fetchBills, deleteBill, updateBill } from "../../actions/bill_actions";
import { connect } from 'react-redux';
import BillsIndex from "./bills_index";
import { getAcceptedUsers } from "../../actions/user_actions";

const mSTP = state => {
    return {
        bills: Object.values(state.entities.bills),
        currentUser: state.session.user,
        housemates: state.entities.users
    };
}

const mDTP = dispatch => {
    return({
        getAcceptedUsers: householdId => dispatch(getAcceptedUsers(householdId)),
        fetchBills: () => dispatch(fetchBills()),
        deleteBill: (bill) => dispatch(deleteBill(bill)),
        updateBill: (bill) => dispatch(updateBill(bill))
    })
}


export default connect(mSTP, mDTP)(BillsIndex);