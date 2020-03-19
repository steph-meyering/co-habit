import { fetchBills } from "../../actions/bill_actions";
import { connect } from 'react-redux';
import BillsIndex from "./bills_index";

const mSTP = state => {
    return({
        bills: Object.values(state.entities.bills)
    })
}

const mDTP = dispatch => {
    return({
        fetchBills: () => dispatch(fetchBills())
    })
}


export default connect(mSTP, mDTP)(BillsIndex);