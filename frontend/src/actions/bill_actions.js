import * as APIUtil from '../util/bill_api_util';

export const RECEIVE_BILL = "RECEIVE_BILL";
export const RECEIVE_BILLS = "RECEIVE_BILLS";
export const REMOVE_BILL = "REMOVE_BILL";
export const RECEIVE_BILL_ERRORS = "RECEIVE_BILL_ERRORS";

export const receiveBill = bill => ({
    type: RECEIVE_BILL,
    bill
})

export const receiveBills = bills => ({
    type: RECEIVE_BILLS,
    bills
});

export const removeBill = bill => ({
	type: REMOVE_BILL,
	bill
});

export const receiveErrors = errors =>({
  type: RECEIVE_BILL_ERRORS,
  errors
})

export const createBill = bill => dispatch => {
    return APIUtil.createBill(bill)
      .then(bill => dispatch(receiveBill(bill)))
      .catch(errors => dispatch(receiveErrors(errors.response.data)))
}
//       {
//         if (error.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           // console.log(error.response.data);
//           // console.log(error.response.status);
//           // console.log(error.response.headers);
//         } else if (error.request) {
//           // The request was made but no response was received
//           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//           // http.ClientRequest in node.js
//           // console.log(error.request);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           // console.log("Error", error.message);
//         }
//         // console.log(error.config);
//       });
// };

export const fetchBills = () => dispatch => APIUtil.getBills()
  .then(bills => dispatch(receiveBills(bills)))
  .catch(err => console.log(err)); 

export const deleteBill = bill => dispatch => APIUtil.deleteBill(bill)
	.then(() => dispatch(removeBill(bill)))
  .catch(err => { 
    dispatch(receiveErrors(err))
  } );
  
export const updateBill = bill => dispatch => APIUtil.updateBill(bill)
  .then(bill => dispatch(receiveBill(bill)))
  .catch(err => console.log(err));

