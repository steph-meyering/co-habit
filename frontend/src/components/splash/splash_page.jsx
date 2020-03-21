import React from "react";
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "login"
    };

    this.changeFormType = this.changeFormType.bind(this);
  }

  changeFormType() {
    if (this.state.formType === "login") {
      this.setState({ formType: "signup" });
    } else {
      this.setState({ formType: "login" });
    }
  }

  render() {
    return (
      <div className="session-div">
        {this.state.formType === "login" ? (
          <>
            <LoginFormContainer />
            <button onClick={this.changeFormType}>
              Not part of a household yet?
            </button>
          </>
        ) : (
          <>
            <SignupFormContainer />
            <button onClick={this.changeFormType}>
              Already in a household?
            </button>
          </>
        )}
      </div>
    );
  }
}

export default SplashPage;
