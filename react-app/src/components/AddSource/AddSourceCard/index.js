import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import './AddSourceCard.css';
import ChooseFeedDropDown from "./ChooseFeedDropDown"
import { parentsHaveClass } from "../../../services/dom"
import { getFeeds } from "../../../store/feeds"
import { rightFeed } from "../../../services/utils"
import { unfollowSource } from "../../../store/follows"


const AddSourceCard = ({ source, name, img, followsArr }) => {
    const dispatch = useDispatch();
    const [showDropDown, setShowDropDown] = useState(false);
    const feeds = useSelector(state => state.feeds);
    const feed = rightFeed(feeds, source.id);
    const followsArrIds = followsArr.map((follow) => follow.sourceId);
    const isFollowed = followsArrIds.includes(Number(source.id));


    function handleFollowClick() {
        setShowDropDown(!showDropDown);
    }

    async function handleUnfollowClick() {
        const payload = {
            sourceId: source.id,
            feed: feed
        }

        await dispatch(unfollowSource(payload));

        setShowDropDown(false)
    }

    useEffect(() => {
        async function getAllFeeds() {
            await dispatch(getFeeds())
        }
        getAllFeeds();
    }, [dispatch])


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
                    {!isFollowed && <button className="add-source__btn--follow"
                        onClick={handleFollowClick}
                    >
                        Follow
                </button>}
                    {isFollowed && <button className="add-source__btn--unfollow"
                        onClick={handleUnfollowClick}
                    >
                        Unfollow
                  </button>}
                    {showDropDown && (
                        < ChooseFeedDropDown source={source} setShowDropDown={setShowDropDown} />)}
                </div>
            </div>
        </div >
    )
}

export default AddSourceCard
