import React from "react";
import { withRouter } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      createHousehold: false,
      housename: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  // componentWillReceiveProps(nextProps) {
  //     if (nextProps.currentUser) {
  //         this.props.history.push('/dashboard');
  //     }

  //     this.setState({ errors: nextProps.errors })
  // }

    componentWillUnmount() {
    // this.props.clearErrors();
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      password2: this.state.password2,
      housename: this.state.housename
    };
    this.props.signup(user);
    // this.props.signup(user, this.props.history);
  }

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
    const existingHousehold = this.props.householdNames.has(
      this.state.housename
    );
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up</h1>
        <input
          type="text"
          value={this.state.email}
          onChange={this.update("email")}
          placeholder="Email"
        />
        <input
          type="text"
          value={this.state.name}
          onChange={this.update("name")}
          placeholder="Name"
        />
        <input
          type="password"
          value={this.state.password}
          onChange={this.update("password")}
          placeholder="Password"
        />
        <input
          type="password"
          value={this.state.password2}
          onChange={this.update("password2")}
          placeholder="Confirm Password"
        />
        <input
          type="text"
          value={this.state.housename}
          onChange={this.update("housename")}
          placeholder="Household Name"
        />
        <span>
          {/* {this.state.housename.length < 2
            ? ""
            : existingHousehold
            ? "Join"
            : ""} */}
        </span>
        <button id="signup">Sign Up</button>
        {this.renderErrors()}
      </form>
    );
  }
}

export default withRouter(SignupForm);
