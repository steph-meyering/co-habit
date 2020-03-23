import { connect } from "react-redux";
import { getHouseholds } from "../../actions/household_actions";
import SplashPage from "./splash_page";
import { login, clearSessionErrors } from "../../actions/session_actions";

const mapDispatchToProps = dispatch => {
  return {
    getHouseholds: () => dispatch(getHouseholds()),
    demoLogin: () =>
      dispatch(
        login({ email: "steven@aa.com", password: "peanutbutterjelly" })
      ),
    clearErrors: () => dispatch(clearSessionErrors())
  };
};

export default connect(null, mapDispatchToProps)(SplashPage);
