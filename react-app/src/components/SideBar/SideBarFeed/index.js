import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { load } from '../../../store/sidebar';
import { NavLink } from 'react-router-dom'
import "../SideBar.css"

const SideBarFeed = ({ feed }) => {
    const dispatch = useDispatch();
    const [showSources, setShowSources] = useState(false)
    const selectedFeed = useSelector(state => state.sidebar)

    console.log(selectedFeed.selected);

    function selected(feed) {
        dispatch(load(feed));
    }

    const dynamicClass = (() => {
        if (feed.id === selectedFeed.selected?.id) {
            return "feed-container--selected"
        } else {
            return "feed-container"
        }
    })();

    return (
        <>
            <div className={dynamicClass}>
                <div className={feed.id === selectedFeed.selected?.id ? "sidebar__icon-chevron--selected" : "sidebar__icon-chevron"}
                    onClick={() => (
                        setShowSources(!showSources))}
                >
                    <i className={showSources ? "fas fa-chevron-down" : "fas fa-chevron-right"}></i>
                </div>
                <div className="sidebar__feed">
                    <NavLink to={`/feeds/${feed.id}`}>
                        <div className={feed.id === selectedFeed.selected?.id ? "sidebar__feed-name--selected" : "sidebar__feed-name"}
                            onClick={() => (selected(feed))}
                        >
                            {feed.feed_name}
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="sidebar__source-container">
                {showSources && feed.sources.map(source => (
                    <div>{source.alt_name}</div>
                ))}
            </div>
        </>
    )
}

export default SideBarFeed
