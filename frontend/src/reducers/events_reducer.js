import { RECEIVE_EVENTS, REMOVE_EVENT, RECEIVE_EVENT } from '../actions/event_actions';

const EventsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_EVENTS:
      newState = {}
      action.events.data.forEach(event => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        newState[event._id] = event;
      });
      return newState;
    case RECEIVE_EVENT:
      let newEvent = {};
      newEvent.allDay = action.event.data.allDay;
      newEvent._id = action.event.data._id;
      newEvent.title = action.event.data.title;
      newEvent.description = action.event.data.description;
      newEvent.start = new Date(action.event.data.start);
      newEvent.end = new Date(action.event.data.end);
      newEvent.author = action.event.data.author;
      newEvent.household = action.event.data.household;
      newEvent.date = action.event.data.date;

      newState[action.event.data._id] = newEvent;
      return newState;
    case REMOVE_EVENT:
      delete newState[action.eventId];
      return newState;
    default:
      return state;
  }
};

export default EventsReducer;