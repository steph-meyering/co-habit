import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignupForm from './signup_form';
import { getHouseholds } from '../../actions/household_actions';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        householdNames: new Set(Object.keys(state.entities.households).map(key => state.entities.households[key].name)),
        errors: state.errors.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: user => dispatch(signup(user)),
        getHouseholds: () => dispatch(getHouseholds())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);