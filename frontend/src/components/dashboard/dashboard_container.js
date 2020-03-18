import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Dashboard from './dashboard';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);