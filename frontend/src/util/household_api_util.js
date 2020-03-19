import axios from 'axios';

export const getUsers = id => {
  return axios.get(`/api/households/${id}/users`)
};

export const getHousehold = id => {
  return axios.get(`/api/households/${id}`)
};