import axios from 'axios';

export const getUsers = id => {
  return axios.get(`/api/households/${id}/users`)
};

export const getEvents = id => {
  return axios.get(`/api/households/${id}/events`)
};

export const getHousehold = id => {
  return axios.get(`/api/households/${id}`)
};