import React, { useState, useEffect } from 'react';
import './AddSourceCard.css';
import ChooseFeedDropDown from "./ChooseFeedDropDown"
import { parentsHaveClass } from "../../../services/dom"

const AddSourceCard = ({ source, name, img }) => {
    const [showDropDown, setShowDropDown] = useState(false);

    function handleFollowClick() {
        setShowDropDown(!showDropDown);
    }




    useEffect(() => {
        if (!showDropDown) return;

        const root = document.getElementById("root");
        const removeListener = () => root.removeEventListener("click", closeDropDown)
        const closeDropDown = (e) => {
            const shouldClose = !(parentsHaveClass(e.target, "dropdown-prevent-close"))
            if (shouldClose) {
                setShowDropDown(false);
            }
        };

        root.addEventListener("click", closeDropDown)

        return () => removeListener();

    }, [showDropDown])


    return (
        <div className="add-source-card">
            <div className="add-source-card__content">
                <div className="add-source-card__card-header">{name}</div>
                <div className="add-source-card__card-img">
                    <img src={img} alt="" />
                </div>
                <div className="add-source-container">
                    <button className="add-source__btn"
                        onClick={handleFollowClick}
                    >
                        Follow
                </button>
                    {showDropDown && (
                        < ChooseFeedDropDown source={source} setShowDropDown={setShowDropDown}/>)}
                </div>
            </div>
        </div >
    )
}

export default AddSourceCard
