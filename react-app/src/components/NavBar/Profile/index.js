import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../auth/LogoutButton";
import "./Profile.css";

const Profile = () => {
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false)
    const openDropdown = () => {
        if (showDropdown) return
        setShowDropdown(true)
    }
    useEffect(() => {
        if (!showDropdown) return
        const closeDropdown = () => {
            setShowDropdown(false)
            return null
        }
        document.addEventListener("click", closeDropdown)
        return () => document.removeEventListener("click", closeDropdown)

    }, [showDropdown])
    return (
        <>
            <div 
                className="navbar__profile"
                onClick={openDropdown}
            >
                <div className="navbar__profile-button">
                    <i className="far fa-user"></i>
                </div>
            </div>
            {showDropdown && (<div className="navbar__profile-dropdown">
                <NavLink to="/" exact={true} activeClassName="active">
                    Home
                </NavLink>
                <NavLink to="/login" exact={true} activeClassName="active">
                    Login 
                </NavLink>
                <NavLink to="/sign-up" exact={true} activeClassName="active">
                    Sign Up
                </NavLink>
                <div>
                    <LogoutButton />{" "}
                </div>
            </div>)}
        </>
    );
};

export default Profile;
