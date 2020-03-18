import axios from 'axios';

export const getHousehold = id => {
  return axios.get(`/api/households/${id}`)
};