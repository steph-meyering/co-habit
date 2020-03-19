import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

class NavBar extends React.Component {
  render() {
    let navLinks = null;
    if (this.props.currentUser) {
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
          <div
            className="nav-item"
          >
            <NavLink
              to="/settings"
              activeClassName="active-navlink"
              className="navlink"
            >
              Settings
            </NavLink>
          </div>
          <div>
            <button onClick={this.props.logout}>Log Out</button>
          </div>
        </div>
      );
    }

    return (
      <div className="navbar">
        <div className="logo-container">
          <Link to="/dashboard">
            <img src="/logo.png" id="logo-img" />
          </Link>
        </div>
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