import React from "react";

import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__profile">
        <div className="navbar__profile-button">
          <i className="far fa-user"></i>
        </div>
      </div>
      <div className="navbar__profile-dropdown">
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
        <NavLink to="/users" exact={true} activeClassName="active">
          Users
        </NavLink>
        <div><LogoutButton /> </div>
      </div>
    </nav>
  );
};

export default NavBar;
