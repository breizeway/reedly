import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from '../../store/feeds';
import SideBarFeed from './SideBarFeed'
import "./SideBar.css"
import ModalWrapper from '../ModalWrapper/'
import AddFeedModalLink from './AddFeedModal/Link'
import AddFeedModalContent from './AddFeedModal/Content'


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
                <div className="sidebar__today sidebar__row">
                    <div className="sidebar__icon-book sidebar__icon">
                        <i className="fa fa-book" aria-hidden="true"></i>
                    </div>
                    <div className='sidebar__title'>Today</div>
                </div>
                <div className="sidebar__read-later sidebar__row">
                    <div className="sidebar__icon-bookmark sidebar__icon">
                        <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                    </div>
                    <div className='sidebar__title'>Read Later</div>
                </div>
            </div>
            <div className="sidebar__feed-list">
                <div className="feed-list__heading">
                    <div className='sidebar__header'>Feeds</div>
                    <div className="sidebar__icon-cog sidebar__icon">
                        <i className="fas fa-cog"></i>
                    </div>
                </div>
                <div className="sidebar__feed-container">
                    <div className="feed-list-all sidebar__row">
                        <div className="sidebar__icon-bars sidebar__icon">
                            <i className="fas fa-bars"></i>
                        </div>
                        <div className="sidebar__feed sidebar__title">All</div>
                    </div>
                    <div className="feed-list" style={{ height: "auto" }}>
                        {feeds && feedsArr.map(feed => (
                            <SideBarFeed key={feed.id} feed={feed} />
                        ))}
                    </div>
                </div>
                <ModalWrapper
                    modalLink={<AddFeedModalLink />}
                    modalContent={<AddFeedModalContent />}
                />
            </div>
            <div className="sidebar__third-section">
                <div className="sidebar__recently-read">
                    <div className="sidebar__icon-clock sidebar__icon">
                        <i className="far fa-clock" sidebar__icon></i>
                    </div>
                    <div className='sidebar__title'>Recently Read</div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
