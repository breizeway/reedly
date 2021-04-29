import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import Profile from "./Profile"
import "./NavBar.css";

const NavBar = () => {
    const history = useHistory()

    return (
        <nav className="navbar">
            <div>
                <div className="site-logo" onClick={() => history.push('/')} />
            </div>
            <div>
                <div className="navbar__button" onClick={() => history.push('/sources/add')}>
                    <i className="fas fa-plus"></i>
                </div>
                <div className="navbar__button" onClick={() => history.push('/about')}>
                    <NavLink to="/about">
                        <i className="far fa-question-circle"></i>
                    </NavLink>
                </div>
            </div>
            <Profile />
        </nav>
    );
};

export default NavBar;
