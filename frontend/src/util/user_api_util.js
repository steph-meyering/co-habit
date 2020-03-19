import axios from 'axios';

export const updateUser = user => {
  return axios.patch(`/api/users/${user._id}`, user);
};

export const deleteUser = id => {
  return axios.delete(`/api/users/${id}`);
};