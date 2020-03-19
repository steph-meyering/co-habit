import * as APIUtil from '../util/bill_api_util';

export const RECEIVE_BILL = "RECEIVE_BILL";
export const RECEIVE_BILLS = "RECEIVE_BILLS";

export const receiveBill = bill => ({
    type: RECEIVE_BILL,
    bill
})

export const receiveBills = bills => ({
    type: RECEIVE_BILLS,
    bills
});


export const createBill = bill => dispatch => APIUtil.createBill(bill)
    .then((bill) => dispatch(receiveBill(bill)));

export const fetchBills = () => dispatch => APIUtil.getBills()
    .then(bills => dispatch(receiveBills(bills))); 