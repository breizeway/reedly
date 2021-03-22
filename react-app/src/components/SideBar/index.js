import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from '../../store/feeds';
import "./SideBar.css"

const SideBar = () => {
    const dispatch = useDispatch();
    const feeds = useSelector(state => state.feeds)
    const feedsArr = Object.values(feeds);

    useEffect(() => {
        dispatch(getFeeds());
    }, [dispatch]);

    return (
        <div className="sidebar">
            <div className="sidebar__feeds">
                {feeds && feedsArr.map(feed => (
                    <div className="sidebar__feed">
                        <div className="sidebar__feed-name">{feed.feed_name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar