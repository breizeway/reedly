import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../auth/LogoutButton";
import "./Profile.css";

const Profile = () => {
    const user = useSelector(state => state.session.user)

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
                <div>
                    {user.username}
                </div>
                <div>
                    {user.email}
                </div>
                <div>
                    <LogoutButton />{" "}
                </div>
            </div>)}
        </>
    );
};

export default Profile;
