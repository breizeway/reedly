import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getFeeds } from '../../store/feeds';
import SideBarFeed from './SideBarFeed'
import "./SideBar.css"
import AddFeed from "../AddFeed"
import Modal from "../Modal"
import * as modalActions from "../../store/modal"

const SideBar = () => {
    const dispatch = useDispatch();
    const feeds = useSelector(state => state.feeds)
    const feedsArr = Object.values(feeds);

    useEffect(() => {
        async function fetchData() {
            await dispatch(getFeeds());
        }
        fetchData();
    }, [dispatch]);

    const modal = {
      thisVal: 'sidebar/addFeed',
      val: useSelector(state => state.modal.active),
      set: () => dispatch(modalActions.setActive(modal.thisVal))
    }

    return (
        <div className="sidebar">
            <div className="sidebar__first-section">
                <div className="sidebar__today sidebar__row">
                    <div className="sidebar__icon-book sidebar__icon">
                        <i className="fa fa-book" aria-hidden="true"></i>
                    </div>
                    <NavLink to="/">
                        <div className='sidebar__title'>Today</div>
                    </NavLink>
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
                <div
                    className="sidebar__row"
                    onClick={modal.set}
                >
                    <div className="sidebar__add-feed sidebar__title">
                        Create New Feed
                    </div>
                </div>
                {modal.val === modal.thisVal && (
                    <Modal content={<AddFeed />} />
                )}
            </div>
            <div className="sidebar__third-section">
                <div className="sidebar__recently-read">
                    <div className="sidebar__icon-clock sidebar__icon">
                        <i className="far fa-clock sidebar__icon"></i>
                    </div>
                    <div className='sidebar__title'>Recently Read</div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
