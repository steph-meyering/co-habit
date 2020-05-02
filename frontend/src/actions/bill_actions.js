import * as APIUtil from "../util/bill_api_util";

export const RECEIVE_BILL = "RECEIVE_BILL";
export const RECEIVE_BILLS = "RECEIVE_BILLS";
export const REMOVE_BILL = "REMOVE_BILL";
export const RECEIVE_BILL_ERRORS = "RECEIVE_BILL_ERRORS";

export const receiveBill = (bill) => ({
  type: RECEIVE_BILL,
  bill,
});

export const receiveBills = (bills) => ({
  type: RECEIVE_BILLS,
  bills,
});

export const removeBill = (bill) => ({
  type: REMOVE_BILL,
  bill,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_BILL_ERRORS,
  errors,
});

export const createBill = (bill) => (dispatch) => {
  return APIUtil.createBill(bill)
    .then((bill) => dispatch(receiveBill(bill)))
    .catch((errors) => dispatch(receiveErrors(errors.response.data)));
};

export const fetchBills = () => (dispatch) =>
  APIUtil.getBills()
    .then((bills) => dispatch(receiveBills(bills)))
    .catch((err) => console.log(err));

export const deleteBill = (bill) => (dispatch) =>
  APIUtil.deleteBill(bill)
    .then(() => dispatch(removeBill(bill)))
    .catch((err) => {
      dispatch(receiveErrors(err));
    });

export const updateBill = (bill) => (dispatch) =>
  APIUtil.updateBill(bill)
    .then((bill) => dispatch(receiveBill(bill)))
    .catch((err) => {
      dispatch(receiveErrors(err));
    });
