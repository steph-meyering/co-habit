import * as APIUtil from '../util/household_api_util';

export const RECEIVE_HOUSEHOLD = "RECEIVE_HOUSEHOLD";

// We'll dispatch this when our user signs in
export const receiveHousehold = household => ({
  type: RECEIVE_HOUSEHOLD,
  household
});

// export const receiveErrors = errors => ({
//   type: RECEIVE_SESSION_ERRORS,
//   errors
// });

export const getHousehold = householdId => dispatch => {
  return APIUtil.getHousehold(householdId)
    .then(household => { dispatch(receiveHousehold(household) )
  })
    // .catch(err => {
    //   dispatch(receiveErrors(err.response.data));
    // })
};