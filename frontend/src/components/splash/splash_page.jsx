import React from "react";
import { Link } from "react-router-dom";
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "login",
      containerCls: "container"
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

    componentDidMount() {
        this.props.getHouseholds();
    }

    changeFormType() {
        if (this.state.formType === "login") {
            this.setState({formType: "signup"});
        } else {
            this.setState({ formType: "login" });
        }
    }
    
    changeContainerCls(e) {
      if (e.target.id === "signUp") {
        this.setState({containerCls: "container right-panel-active"});
      } else if (e.target.id === "signIn") {
        this.setState({ containerCls: "container" });
      }
    }

    render() {
        return (
          <div className="splash">
            <img src="/logo.png" id="splash-logo" alt="logo" />
            <p>Assign Chores. Track Bills. Schedule Events.</p>
            <p>Lessen the stresses of co-living with Co-Habit.</p>
            <div className={this.state.containerCls} id="container">
              <div className="form-container sign-up-container">
                <SignupFormContainer />
              </div>
              <div className="form-container sign-in-container">
                <LoginFormContainer />
              </div>
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Welcome Home!</h1>
                    <p>To manage your household, sign in with your personal credentials</p>
                    <button onClick={this.changeContainerCls.bind(this)} className="ghost" id="signIn">Sign In</button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Hey New Roomie!</h1>
                    <p>Start co-habiting your way to a more organized living space</p>
                    <button onClick={this.changeContainerCls.bind(this)} className="ghost" id="signUp">Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default SplashPage;
