import React from "react";
import { NavLink } from "react-router-dom";
import Profile from "./Profile"
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
        </div>
        <div>
        <div className="navbar__button">
        <i className="fas fa-plus"></i>
        </div>
        <div className="navbar__button">
          <i className="fas fa-search"></i>
        </div>
        <div className="navbar__button">
          <i className="fas fa-moon"></i>
        </div>
        <div className="navbar__button">
          <i className="far fa-question-circle"></i>
        </div>
      </div>
      <Profile />
    </nav>
  );
};

export default NavBar;
