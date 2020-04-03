import { connect } from 'react-redux';
import HouseholdCalendar from './calendar';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../actions/event_actions';
import { fetchChores } from "../../actions/chore_actions";
import moment from "moment";
import { getUsers } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  //get array of all chores
  let chores = Object.values(state.entities.chores);
  let dueDateEvents = [];
  //iterate though all chores and create an event-like object that
  //the calendar will be able to render
  for (let i = 0; i < chores.length; i++) {
    //create shallow copy of chore
    const chore = Object.assign({}, chores[i]);
    for (let j = 0; j < chore.dueDate.length; j++) {
      let ddate = chore.dueDate[j];
      //use moment library to add 8 hours to the chore's due date to comply with
      //calendar's time requirements
      ddate = moment(new Date(ddate)).add(8, "hours").toDate();
      let dueDateEvent = {
        allDay: true,
        _id: chore._id,
        title: chore.title,
        description: chore.description,
        start: ddate,
        end: ddate,
        author: chore.assignedUser,
        household: chore.household,
        assignedUser: chore.assignedUser
      };
      dueDateEvents.push(dueDateEvent);
    }
  }
  //join chores and events so the render function can iterate through
  //all at the same time and treat them the same way
  let allEvents = Object.values(state.entities.events).concat(dueDateEvents);
  //set constant colors so that each user always has the same
  //color on the calendar
  const colors = [
    "#88C9C9",
    "#7AD3B7",
    "#297373",
    "#506C84",
    "#afe0ce",
    "#edffff",
    "#849ca5",
    "#904e55",
    "#031a6b",
  ];
  const users = Object.keys(state.entities.users);
  //assign an event or event-like chore object a color; users will always be
  //fetched in the same order, so they will receive the same color
  if (users.length > 0) {
    for (let i = 0; i < allEvents.length; i++) {
      const event = allEvents[i];
      event.color = colors[users.indexOf(event.author)]
    }
  }

  return {
    currentUser: state.session.user,
    users: state.entities.users,
    events: allEvents,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: (householdId) => dispatch(getEvents(householdId)),
    createEvent: (event) => dispatch(createEvent(event)),
    updateEvent: (event) => dispatch(updateEvent(event)),
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
    fetchChores: () => dispatch(fetchChores()),
    getUsers: (householdId) => dispatch(getUsers(householdId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseholdCalendar);