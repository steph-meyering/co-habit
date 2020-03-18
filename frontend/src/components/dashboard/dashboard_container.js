import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Dashboard from './dashboard';
import { getHousehold } from '../../actions/household_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    household: state.entities.households[state.session.user.household],
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getHousehold: (householdId) => dispatch(getHousehold(householdId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);