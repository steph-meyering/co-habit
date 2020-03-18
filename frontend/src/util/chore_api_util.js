import axios from "axios";

export const getChores = () => {
  return axios.get("/api/chores");
};
export const getChoresForUser = user => {
  return axios.get(`/api/chores/user/${user.id}`);
};

export const createChore = chore => {
  return axios.post("/api/chores", chore);
};

export const updateChore = chore => {
  return axios.patch(`/api/chores/${chore._id}`, chore);
};

