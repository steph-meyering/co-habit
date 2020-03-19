import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <div className="logo-container">
          <Link to="/dashboard">
            <img src="/logo.png" height="50px" />
          </Link>
        </div>
        <div className="nav-item">
          <NavLink to="/" activeClassName="active-navlink" className="navlink">
            Home
          </NavLink>
        </div>
        <div
          className="nav-item"
          activeClassName="active-navlink"
          className="navlink"
        >
          <NavLink to="/chores">Chores</NavLink>
        </div>
        <div
          className="nav-item"
          activeClassName="active-navlink"
          className="navlink"
        >
          <NavLink to="/bills">Bills</NavLink>
        </div>
        <div
          className="nav-item"
          activeClassName="active-navlink"
          className="navlink"
        >
          <NavLink to="/settings">Settings</NavLink>
        </div>
        <div>
          <button onClick={this.props.logout}>Log Out</button>
        </div>
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
