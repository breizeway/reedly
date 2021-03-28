import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { load } from '../../../store/sidebar';
import { NavLink } from 'react-router-dom'
import "./SideBarSource.css"
import "../SideBar.css"

const SideBarFeed = ({ feed }) => {
    const dispatch = useDispatch();
    const [showSources, setShowSources] = useState(false)
    const selectedNews = useSelector(state => state.sidebar)

    function selected(feedOrSource) {
        dispatch(load(feedOrSource));
    }


    // const dynamicClass = (() => {
    //     if (feed.id === selectedNews.selected?.id) {
    //         return "feed-container--selected"
    //     } else {
    //         return "feed-container"
    //     }
    // })();

    return (
        <>
            <div className={feed.id === selectedNews.selected?.id ? "feed-container--selected sidebar__row" : "feed-container sidebar__row"}>
                <div className="sidebar__icon-chevron sidebar__icon"
                    onClick={() => (
                        setShowSources(!showSources))}
                >
                    <i className={showSources ? "fas fa-chevron-down" : "fas fa-chevron-right"}></i>
                </div>
                <div className="sidebar__feed">
                    <NavLink to={`/feeds/${feed.id}`}>
                        <div className={feed.id === selectedNews.selected?.id ? "sidebar__feed-name--selected sidebar__title" : "sidebar__feed-name sidebar__title"}
                            onClick={() => (selected(feed))}
                        >
                            {feed.feed_name}
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="sidebar__sources-container">
                {showSources && feed.sources.map(source => (
                    <div className={source.id === selectedNews.selected?.id ? "sidebar__source-container--selected sidebar__row" : "sidebar__source-container sidebar__row"}
                        key={source.id}
                        onClick={() => (selected(source))}
                    >
                        <NavLink to={`/sources/${source.id}`}>
                            <div className='sidebar__icon'>
                                <img src={source.source_img} alt=""/>
                            </div>
                            <div className='sidebar__title'>{source.alt_name}</div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SideBarFeed
