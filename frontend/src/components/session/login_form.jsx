import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    // Once the user has been authenticated, redirect
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.currentUser) {
    //         this.props.history.push(`/dashboard`);
    //     }

    //     // Set or clear errors
    //     this.setState({ errors: nextProps.errors })
    // }

    // Handle field updates (called in the render method)
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.login(user)
    }

    // Render the session errors if there are any
    renderErrors() {
        
        return (
            <ul className="session-errors">
                {Object.keys(this.props.errors).map((error, i) => (
                    <li key={`error-${i}`} className="red">
                        {this.props.errors[error]}

                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign In</h1>
                    <input type="text"
                        value={this.state.email}
                        onChange={this.update('email')}
                        placeholder="Email"
                    />
                    <input type="password"
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder="Password"
                    />
                    <button>Sign In</button>
                    {this.renderErrors()}
                </form>
        );
    }
}

export default withRouter(LoginForm);