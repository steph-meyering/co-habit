import * as HouseholdAPIUtil from '../util/household_api_util';
import * as EventAPIUtil from "../util/event_api_util";

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";

export const receiveEvents = events => {
  return {
    type: RECEIVE_EVENTS,
    events
  };
};

export const receiveEvent = event => {
  return {
    type: RECEIVE_EVENT,
    event
  };
};

export const removeEvent = eventId => {
  return {
    type: REMOVE_EVENT,
    eventId
  };
};

export const getEvents = (householdId) => dispatch => {
  return HouseholdAPIUtil.getEvents(householdId)
    .then(events => dispatch(receiveEvents(events)))
    .catch(err => console.log(err));
};

export const createEvent = event => dispatch => {
  return EventAPIUtil.createEvent(event)
    .then(event => dispatch(receiveEvent(event)))
    .catch(err => console.log(err));
};

export const updateEvent = event => dispatch => {
  return EventAPIUtil.updateEvent(event)
    .then(event => dispatch(receiveEvent(event)))
    .catch(err => console.log(err));
};

export const deleteEvent = eventId => dispatch => {
  return EventAPIUtil.deleteEvent(eventId)
    .then(event => dispatch(removeEvent(event.data._id)))
    .catch(err => console.log(err));
};
