import axios from "axios";

// export const getEvents = (householdId) => {
//   return axios.get(`/api/${householdId}/events`);
// };

export const createEvent = event => {
  return axios.post("/api/events", event);
};

export const updateEvent = event => {
  return axios.patch(`/api/events/${event._id}`, event);
};

export const deleteEvent = eventId => {
  return axios.delete(`/api/events/${eventId}`);
};
