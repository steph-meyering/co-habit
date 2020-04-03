import * as HouseholdAPIUtil from '../util/household_api_util';
import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const REMOVE_USER = "REMOVE_USER";
export const RECEIVE_USER = "RECEIVE_USER";

// We'll dispatch this when our user signs in
export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const removeUser = userId => ({
  type: REMOVE_USER,
  userId
});

// export const receiveErrors = errors => ({
//   type: RECEIVE_SESSION_ERRORS,
//   errors
// });

//use household api go through household route
export const getUsers = householdId => dispatch => {
  return HouseholdAPIUtil.getUsers(householdId)
    .then(users => {
      dispatch(receiveUsers(users))
    })
  // .catch(err => {
  //   dispatch(receiveErrors(err.response.data));
  // })
};

export const getAcceptedUsers = householdId => dispatch => {
  return HouseholdAPIUtil.getAcceptedUsers(householdId)
    .then(users => {
      dispatch(receiveUsers(users))
    })
  // .catch(err => {
  //   dispatch(receiveErrors(err.response.data));
  // })
};

export const updateUser = user => dispatch => {
  return UserAPIUtil.updateUser(user)
    .then(user => {
      dispatch(receiveUser(user))
    })
};

export const deleteUser = userId => dispatch => {
  return UserAPIUtil.deleteUser(userId)
    .then(user => {
      dispatch(removeUser(user.data._id))
    })
};