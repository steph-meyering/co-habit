import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import LoginForm from "./login_form";
import { clearSessionErrors } from "../../actions/session_actions";

const mapStateToProps = state => {
  return {
    currentUser: state.session.user,
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearSessionErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
