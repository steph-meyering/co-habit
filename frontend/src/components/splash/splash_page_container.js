import { connect } from 'react-redux';
import { getHouseholds } from '../../actions/household_actions';
import SplashPage from './splash_page';

const mapDispatchToProps = (dispatch) => {
  return {
    getHouseholds: () => dispatch(getHouseholds())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SplashPage);