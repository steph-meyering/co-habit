import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Dashboard from './dashboard';
import { getHousehold } from '../../actions/household_actions';
import { getUsers, updateUser, deleteUser } from '../../actions/user_actions';
import { clearSessionErrors } from "../../actions/session_actions";

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    household: state.entities.households[state.session.user.household],
    users: Object.values(state.entities.users)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getHousehold: householdId => dispatch(getHousehold(householdId)),
    getUsers: householdId => dispatch(getUsers(householdId)),
    updateUser: user => dispatch(updateUser(user)),
    deleteUser: userId => dispatch(deleteUser(userId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);