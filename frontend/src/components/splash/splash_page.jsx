import React from "react";
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "login",
      containerCls: "container",
    };
  }

  componentDidMount() {
    this.props.getHouseholds();
  }

  //trigger css transition and show other form
  changeContainerCls(e) {
    if (e.target.id === "signUp") {
      this.setState({ containerCls: "container right-panel-active" });
    } else if (e.target.id === "signIn") {
      this.setState({ containerCls: "container" });
    }
    this.props.clearErrors();
  }

  render() {
    return (
      <div className="splash">
        <img src="/logo.png" id="splash-logo" alt="logo" />
        <p>
          <i className="fas fa-broom"></i> Assign Chores.{" "}
          <i className="fas fa-file-invoice-dollar"></i> Track Bills.{" "}
          <i className="fas fa-calendar-alt"></i> Schedule Events.
        </p>
        <p>Lessen the stresses of co-living with CO-HABIT.</p>
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
                <p>
                  To manage your household, sign in to your personal account
                </p>
                <button
                  onClick={this.changeContainerCls.bind(this)}
                  className="ghost"
                  id="signIn"
                >
                  Sign In
                </button>
                <button
                  id="demo-user"
                  onClick={this.props.demoLogin}
                  className="ghost"
                >
                  Demo User Login
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hey New Roomie!</h1>
                <p>
                  Start co-habiting your way to a more organized living space
                </p>
                <button
                  onClick={this.changeContainerCls.bind(this)}
                  className="ghost"
                  id="signUp"
                >
                  Sign Up
                </button>
                <button
                  id="demo-user"
                  onClick={this.props.demoLogin}
                  className="ghost"
                >
                  Demo User Login
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <span><a id="github-sd" href="https://github.com/s-davies">
            Steven Davies{" "}
            
              <i className="fab fa-github"></i>
            </a>{" "}
            <a
              id="linkedin-sd"
              href="https://www.linkedin.com/in/steven-davies-bb700119b/"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </span>
          <span><a id="github-sm" href="https://github.com/steph-meyering">
            Stephane Meyering{" "}
            
              <i className="fab fa-github"></i>
            </a>{" "}
            <a
              id="linkedin-sm"
              href="https://www.linkedin.com/in/steph-meyering"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </span>
          <span><a id="github-ss" href="https://github.com/sara-ls">
            Sara Sampson{" "}
            
              <i className="fab fa-github"></i>
            </a>{" "}
            <a
              id="linkedin-ss"
              href="https://www.linkedin.com/in/sara-sampson-152365a2"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </span>
        </footer>
      </div>
    );
  }
}

export default SplashPage;
