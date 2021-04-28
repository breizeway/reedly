import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { runAddToday } from '../../store/views';
import './HomePage.css';
import ArticleCard from '../ArticleCard'

function HomePage() {
    const dispatch = useDispatch();
    const todayFeeds = useSelector(state => state.views.today)

    useEffect(() => {
        (async () => {
            await dispatch(runAddToday());
        })()
    }, [dispatch]);

    return todayFeeds && (
        <div className="homepage-container">
            <div className="homepage__heading">
                <span id="homepage__today">Today</span>
                <span id="homepage__sub-heading">The insights you need to keep ahead</span>
            </div>
            <div className='homepage__feeds'>
                {todayFeeds.map(feed => (
                    <>
                        <div className='article-list__title'>{feed.feed_name}</div>
                        {feed.entries.map(entry => (
                            <ArticleCard entry={entry} />
                        ))}
                    </>
                ))}
            </div>
        </div>
    )
}

export default HomePage
