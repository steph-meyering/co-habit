import { connect } from "react-redux";
import { createBill } from "../../actions/bill_actions";
import BillForm from "./bill_form";

const mSTP = state => {
    return({
        currentUser: state.session.user
    })
}

const mDTP = dispatch => {
    return({
        createBill: (bill) => dispatch(createBill(bill))
    })
}

export default connect(mSTP, mDTP)(BillForm);

