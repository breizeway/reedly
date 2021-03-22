import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from '../../store/feeds';
import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const feeds = useSelector((state) => {
        return state.feeds;
    })

    const feedsArr = Object.values(feeds);

    useEffect(() => {
        dispatch(getFeeds());
    }, [dispatch]);

    return (
        <>
            <div>This is the home page.</div>
            <div className="homepage__feeds-container">
                {feedsArr.map((feed) => {
                    return (
                        <div key={feed.id}>
                            <span>{feed.feed_name}</span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default HomePage
