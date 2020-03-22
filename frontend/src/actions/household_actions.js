import * as APIUtil from '../util/household_api_util';

export const RECEIVE_HOUSEHOLD = "RECEIVE_HOUSEHOLD";
export const RECEIVE_HOUSEHOLDS = "RECEIVE_HOUSEHOLDS";

// We'll dispatch this when our user signs in
export const receiveHousehold = household => ({
  type: RECEIVE_HOUSEHOLD,
  household
});

export const receiveHouseholds = households => ({
  type: RECEIVE_HOUSEHOLDS,
  households
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

export const getHouseholds = () => dispatch => {
  return APIUtil.getHouseholds()
    .then(households => {
      dispatch(receiveHouseholds(households))
    })
    .catch(err => console.log(err));
};