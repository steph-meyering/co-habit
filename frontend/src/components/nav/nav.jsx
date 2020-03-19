import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Link to="/dashboard">
          <img src="/logo.png" height="50px" />
        </Link>
      </div>
    );
  }
}

export default NavBar;
