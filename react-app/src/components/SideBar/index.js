import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getFeeds } from '../../store/feeds';
import SideBarFeed from './SideBarFeed'
import "./SideBar.css"
import AddFeed from "../AddFeed"
import Modal from "../Modal"
import * as modalActions from "../../store/modal"
import { load } from "../../store/sidebar";

const SideBar = () => {
    const dispatch = useDispatch();
    const feeds = useSelector(state => state.feeds)
    const feedsArr = Object.values(feeds);
    const selectedNews = useSelector(state => state.sidebar);

    console.log(selectedNews);

    const isSelected = (selectedNews) => {
        (function () {
            if (selectedNews.selected === "all") {
                return `--selected`; 
            }
        })();
    }

    async function selected(feedOrSource) {
        console.log("working", feedOrSource);

        await dispatch(load(feedOrSource));
    }


    useEffect(() => {
        (async () => {
            await dispatch(getFeeds());
        })()
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
                    <NavLink to="/today">
                        <div className='sidebar__title'>Today</div>
                    </NavLink>
                </div>
            </div>
            <div className="sidebar__feed-list">
                <div className="feed-list__heading">
                    <div className='sidebar__header'>Feeds</div>
                </div>
                <div className="sidebar__feed-container">
                    <div onClick={() => selected('all')} className={`feed-list-all sidebar__row ${isSelected}`}>
                        <div className="sidebar__icon-bars sidebar__icon">
                            <i className="fas fa-bars"></i>
                        </div>
                        <NavLink to="/all">
                            <div className="sidebar__feed sidebar__title">All</div>
                        </NavLink>
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
            </div>
        </div>
    )
}

export default SideBar
