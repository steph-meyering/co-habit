import { connect } from 'react-redux';
import HouseholdCalendar from './calendar';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../actions/event_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    events: Object.values(state.entities.events),
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: (householdId) => dispatch(getEvents(householdId)),
    createEvent: (user) => dispatch(createEvent(user)),
    updateEvent: (user) => dispatch(updateEvent(user)),
    deleteEvent: (userId) => dispatch(deleteEvent(userId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseholdCalendar);