import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
                <div className='navbar__profile-button'>
                    <i className="far fa-user" />
                </div>
            </div>
            {showDropdown && (<div className="navbar__profile-dropdown">
                <div className="top-container">
                    <div className="r-icon">
                        <i className="fas fa-registered" />
                    </div>
                    <div className="user_container">
                        <div className="user_container__name">
                            {user.username}
                        </div>
                        <div className="user_container__email">
                            {user.email}
                        </div>
                    </div>
                </div>
                <div className="profile-dropdown-button">
                    <p>Settings</p>
                </div>
                <div className="profile-dropdown-button">
                    <p>Organize Sources</p>
                </div>
                <div className="profile-dropdown-button">
                    <p>Mobile Apps</p>
                </div>
                <div className="profile-dropdown-button">
                    <p>Browser Add-ons</p>
                </div>
                <div className="profile-dropdown-button">
                    <p>Support</p>
                </div>
                <div className="profile-dropdown-button">
                    <p>Privacy</p>
                </div>
                <div className="profile-dropdown-button">
                    <p>Terms & Policy</p>
                </div>
                <div className="profile-dropdown-button">
                    <LogoutButton />{" "}
                </div>
            </div>)}
        </>
    );
};

export default Profile;
