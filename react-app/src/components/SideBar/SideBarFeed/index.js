import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { load } from '../../../store/sidebar';
import { NavLink } from 'react-router-dom'
import "./SideBarSource.css"
import "../SideBar.css"

const SideBarFeed = ({ feed }) => {
    const dispatch = useDispatch();
    const [showSources, setShowSources] = useState(false)

    async function selected(feedOrSource) {
        await dispatch(load(feedOrSource));
    }

    if (!feed) {
        return null
    }

    return feed && (
        <>
            <div className="feed-container sidebar__row">
                <div className="sidebar__icon-chevron sidebar__icon"
                    onClick={() => (
                        setShowSources(!showSources))}
                >
                    <i className={showSources ? "fas fa-chevron-down" : "fas fa-chevron-right"}></i>
                </div>
                <NavLink to={`/feeds/${String(feed.id)}`}>
                    <div className="sidebar__feed-name sidebar__title"
                        onClick={() => (selected(feed))}
                    >
                        {feed.feed_name}
                    </div>
                </NavLink>
            </div>
            <div className="sidebar__sources-container">
                {showSources && feed?.sources?.map(source => (
                    <div className="sidebar__source-container sidebar__row"
                        key={source.id}
                        onClick={() => (selected(source))}
                    >
                        <NavLink to={`/sources/${source.id}`}>
                            <div className='sidebar__icon'>
                                {source.source_img ? (
                                    <img src={source.source_img} alt="rss source icon" />
                                ) : (
                                    <div className='sidebar__default-icon'>
                                        <i className='fas fa-rss-square' />
                                    </div>
                                )}
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
