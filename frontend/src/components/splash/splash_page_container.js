import { connect } from 'react-redux';
import { getHouseholds } from '../../actions/household_actions';
import SplashPage from './splash_page';
import {login} from "../../actions/session_actions"

const mapDispatchToProps = (dispatch) => {
  return {
    getHouseholds: () => dispatch(getHouseholds()),
    demoLogin: () =>
      dispatch(login({ email: "steven@aa.com", password: "peanutbutterjelly" }))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SplashPage);