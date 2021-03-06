import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: (!!this.props.currentUser.id )
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.setState({ loggedIn: false });
  }

  render() {
    let navLinks = null;
    if (this.props.currentUser && this.props.currentUser.id) {
      navLinks = (
        <div className="nav-items">
          <div className="nav-item">
            <NavLink
              to="/dashboard"
              activeClassName="active-navlink"
              className="navlink"
            >
              Home
            </NavLink>
          </div>
          {this.props.currentUser.acceptedIntoHousehold ? (
            <>
              <div className="nav-item">
                <NavLink
                  to="/chores"
                  activeClassName="active-navlink"
                  className="navlink"
                >
                  Chores
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  activeClassName="active-navlink"
                  className="navlink"
                  to="/bills"
                >
                  Bills
                </NavLink>
              </div>
              <div className="nav-item">
                <NavLink
                  activeClassName="active-navlink"
                  className="navlink"
                  to="/calendar"
                >
                  Calendar
                </NavLink>
              </div>
            </>
          ) : null}
          <div>
            <button onClick={this.handleLogout}>Log Out</button>
          </div>
        </div>
      );
    }

    return (
      <div className="navbar">
          <Link to="/dashboard" id="logo-link">
            <img src="/logo.png" id="logo-img" alt="logo" />
          </Link>
        {navLinks}
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  currentUser: session.user
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
