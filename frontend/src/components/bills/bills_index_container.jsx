import { fetchBills, deleteBill } from "../../actions/bill_actions";
import { connect } from 'react-redux';
import BillsIndex from "./bills_index";

const mSTP = state => {
    return({
        bills: Object.values(state.entities.bills),
        currentUser: state.session.user,
    })
}

const mDTP = dispatch => {
    return({
        fetchBills: () => dispatch(fetchBills()),
        deleteBill: (bill) => dispatch(deleteBill(bill))
    })
}


export default connect(mSTP, mDTP)(BillsIndex);