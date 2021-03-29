import React from "react";
import { NavLink } from "react-router-dom";
import Profile from "./Profile"
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div>
                <div className="site-logo">
                    <NavLink exact to="/" className='site-logo__link' />
                </div>
            </div>
            <div>
                <div className="navbar__button">
                    <NavLink to="/sources/add">
                        <i className="fas fa-plus"></i>
                    </NavLink>
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
