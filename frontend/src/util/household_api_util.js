import axios from 'axios';

export const getUsers = id => {
  return axios.get(`/api/households/${id}/users`)
};

export const getAcceptedUsers = id => {
  return axios.get(`/api/households/${id}/acceptedUsers`)
};

export const getHousehold = id => {
  return axios.get(`/api/households/${id}`)
};