import * as APIUtil from "../util/chore_api_util";

export const RECEIVE_CHORES = "RECEIVE_CHORES";
export const RECEIVE_NEW_CHORE = "RECEIVE_NEW_CHORE";
export const DELETE_CHORE = "DELETE_CHORE";

export const receiveChores = chores => {
  return {
    type: RECEIVE_CHORES,
    chores
  };
};

export const receiveNewChore = chore => {
  return {
    type: RECEIVE_NEW_CHORE,
    chore
  };
};

export const removeChore = choreId => {
  return {
    type: DELETE_CHORE,
    choreId
  };
};

export const fetchChores = () => dispatch => {
  return APIUtil.getChores()
    .then(chores => dispatch(receiveChores(chores)))
    .catch(err => console.log(err));
};

export const fetchChoresForUser = user => dispatch => {
  return APIUtil.getChoresForUser(user)
    .then(chores => dispatch(receiveChores(chores)))
    .catch(err => console.log(err));
};

export const createNewChore = chore => dispatch => {
  return APIUtil.createChore(chore)
    .then(chore => dispatch(receiveNewChore(chore)))
    .catch(err => console.log(err));
};

export const updateChore = chore => dispatch => {
  return APIUtil.updateChore(chore)
    .then(chore => {
      dispatch(receiveNewChore(chore));
    })
    .catch(err => console.log(err));
};

export const deleteChore = choreId => dispatch => {
  return APIUtil.deleteChore(choreId)
    .then(choreId => {
      dispatch(removeChore(choreId));
    })
    .catch(err => console.log(err));
};
