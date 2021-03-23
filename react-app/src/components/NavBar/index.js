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
      <Profile />
    </nav>
  );
};

export default NavBar;
