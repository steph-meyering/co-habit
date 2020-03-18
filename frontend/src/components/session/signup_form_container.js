import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        errors: state.errors.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: user => dispatch(signup(user))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm);