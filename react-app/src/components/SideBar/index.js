import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from '../../store/feeds';
import SideBarFeed from './SideBarFeed'
import "./SideBar.css"
import CreateFeedModal from '../AddFeedFormModal/'

const SideBar = () => {
    const dispatch = useDispatch();
    const feeds = useSelector(state => state.feeds)
    const feedsArr = Object.values(feeds);

    useEffect(() => {
        dispatch(getFeeds());
    }, [dispatch]);

    return (
        <div className="sidebar">
            <div className="sidebar__first-section">
                <div className="sidebar__today">
                    <div className="sidebar__icon-book">
                        <i className="fa fa-book" aria-hidden="true"></i>
                    </div>
                    <div>
                        <span>Today</span>
                    </div>
                </div>
                <div className="sidebar__read-later">
                    <div className="sidebar__icon-bookmark">
                        <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                    </div>
                    <span>Read Later</span>
                </div>
            </div>
            <div className="sidebar__feed-list">
                <div className="feed-list__heading">
                    <h3>Feeds</h3>
                    <div className="sidebar__icon-cog">
                        <i className="fas fa-cog"></i>
                    </div>
                </div>
                <div className="sidebar__feed-container">
                    <div className="feed-list-all">
                        <div className="sidebar__icon-bars">
                            <i className="fas fa-bars"></i>
                        </div>
                        <div className="sidebar__feed">All</div>
                    </div>
                    <div className="feed-list" style={{ height: "auto" }}>
                        {feeds && feedsArr.map(feed => (
                            <SideBarFeed key={feed.id} feed={feed} />
                        ))}
                    </div>
                </div>
                <CreateFeedModal />
            </div>
            <div className="sidebar__third-section">
                <div className="sidebar__recently-read">
                    <div className="sidebar__icon-clock">
                        <i className="fas fa-clock"></i>
                    </div>
                    <span>Recently Read</span>
                </div>
            </div>
        </div>
    )
}

export default SideBar
