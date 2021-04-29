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

    async function selected(feedOrSource) {
        await dispatch(load(feedOrSource));
    }

    if (!feed) {
        return null
    }

    return feed && (
        <>
            <div className={feed.feed_name === selectedNews.selected?.feed_name ? "feed-container--selected sidebar__row" : "feed-container sidebar__row"}>
                <div className="sidebar__icon-chevron sidebar__icon"
                    onClick={() => (
                        setShowSources(!showSources))}
                >
                    <i className={showSources ? "fas fa-chevron-down" : "fas fa-chevron-right"}></i>
                </div>
                <div className="sidebar__feed">
                    <NavLink to={`/feeds/${String(feed.id)}`}>
                        <div className={feed.feed_name === selectedNews.selected?.feed_name ? "sidebar__feed-name--selected sidebar__title" : "sidebar__feed-name sidebar__title"}
                            onClick={() => (selected(feed))}
                        >
                            {feed.feed_name}
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="sidebar__sources-container">
                {showSources && feed?.sources.map(source => (
                    <div className={source.alt_name === selectedNews.selected?.alt_name ? "sidebar__source-container--selected sidebar__row" : "sidebar__source-container sidebar__row"}
                        key={source.id}
                        onClick={() => (selected(source))}
                    >
                        <NavLink to={`/sources/${source.id}`}>
                            <div className='sidebar__icon'>
                                {source.source_img ? (
                                    <img src={source.source_img} alt="rss source icon"/>
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
