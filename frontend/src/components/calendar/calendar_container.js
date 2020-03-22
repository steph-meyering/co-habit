import { connect } from 'react-redux';
import HouseholdCalendar from './calendar';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../actions/event_actions';
import { fetchChores } from "../../actions/chore_actions";
import moment from "moment";
import { getUsers } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  let chores = Object.values(state.entities.chores);
  let dueDateEvents = [];
  for (let i = 0; i < chores.length; i++) {
    const chore = Object.assign({}, chores[i]);
    for (let j = 0; j < chore.dueDate.length; j++) {
      let ddate = chore.dueDate[j];
      // if (j === 0) {
      //   ddate = moment(new Date(ddate)).add(1, "hours").toDate();
      // } else {
      //   ddate = new Date(ddate);
      // }
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

  let allEvents = Object.values(state.entities.events).concat(dueDateEvents);
  const colors = ["#F4976C", "#FBE8A6", "#303C6C", "#B4DFE5", "#D2FDFF"];
  const users = Object.keys(state.entities.users);
  if (users.length > 0) {
    for (let i = 0; i < allEvents.length; i++) {
      const event = allEvents[i];
      event.color = colors[users.indexOf(event.author)]
    }
  }

  return {
    currentUser: state.session.user,
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