import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Dashboard from './dashboard';
import { getHousehold } from '../../actions/household_actions';
import { getUsers, updateUser, deleteUser } from '../../actions/user_actions';
import {fetchChoresForUser} from '../../actions/chore_actions';
import { fetchBills } from '../../actions/bill_actions';
import { getEvents } from '../../actions/event_actions';

const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const mapStateToProps = (state) => {
  const allBills = Object.values(state.entities.bills);
  let usersBills = [];
  for (let i = 0; i < allBills.length; i++) {
    const bill = allBills[i];
    if (bill.user === state.session.user.id) {
      usersBills.push(Object.assign({}, bill));
    }
  }

  const allEvents = Object.values(state.entities.events);
  let usersEventsToday = [];
  for (let i = 0; i < allEvents.length; i++) {
    const event = allEvents[i];
    if (event.author === state.session.user.id && 
      (event.start.getTime() <= (new Date()).getTime() || datesAreOnSameDay(event.start, new Date())) && 
      (event.end.getTime() >= (new Date()).getTime() || datesAreOnSameDay(event.end, new Date()))) {
      usersEventsToday.push(Object.assign({}, event));
    }
  }

  const allChores = Object.values(state.entities.chores);
  let usersChoresToday = [];
  for (let i = 0; i < allChores.length; i++) {
    const chore = allChores[i];
    if (chore.assignedUser === state.session.user.id &&
      (new Date(chore.dueDate[0]).getTime() <= (new Date()).getTime() || datesAreOnSameDay(new Date(chore.dueDate[0]), new Date()))) {
      usersChoresToday.push(Object.assign({}, chore));
    }
  }

  return {
    currentUser: state.session.user,
    household: state.entities.households[state.session.user.household],
    users: Object.values(state.entities.users),
    chores: allChores,
    bills: usersBills,
    events: usersEventsToday.concat(usersChoresToday),
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getHousehold: (householdId) => dispatch(getHousehold(householdId)),
    getUsers: (householdId) => dispatch(getUsers(householdId)),
    updateUser: (user) => dispatch(updateUser(user)),
    deleteUser: (userId) => dispatch(deleteUser(userId)),
    fetchChoresForUser: user => dispatch(fetchChoresForUser(user)),
    fetchBills: () => dispatch(fetchBills()),
    getEvents: (householdId) => dispatch(getEvents(householdId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);