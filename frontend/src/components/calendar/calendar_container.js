import { connect } from 'react-redux';
import HouseholdCalendar from './calendar';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../actions/event_actions';
import { fetchChores } from "../../actions/chore_actions";
import moment from "moment";

const mapStateToProps = (state) => {
  let chores = Object.values(state.entities.chores);
  let dueDateEvents = [];
  for (let i = 0; i < chores.length; i++) {
    const chore = Object.assign({}, chores[i]);
    for (let j = 0; j < chore.dueDate.length; j++) {
      let ddate = chore.dueDate[j];
      if (j === 0) {
        ddate = moment(new Date(ddate)).add(7, "hours").toDate();
      } else {
        ddate = new Date(ddate);
      }
      let dueDateEvent = {
        allDay: true,
        _id: chore._id,
        title: chore.title,
        description: chore.description,
        start: ddate,
        end: ddate,
        author: chore.assignedUser,
        household: chore.household
      };
      dueDateEvents.push(dueDateEvent);
    }
  }

  return {
    currentUser: state.session.user,
    events: Object.values(state.entities.events).concat(dueDateEvents),
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: (householdId) => dispatch(getEvents(householdId)),
    createEvent: (event) => dispatch(createEvent(event)),
    updateEvent: (event) => dispatch(updateEvent(event)),
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
    fetchChores: () => dispatch(fetchChores())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseholdCalendar);