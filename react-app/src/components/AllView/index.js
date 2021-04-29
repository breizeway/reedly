import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { runAddToday } from '../../store/views';
import './AllView.css';
import ArticleCard from '../ArticleCard'
import Loading from '../Loading'
import ServerError from '../ServerError'

function AllView() {
    const dispatch = useDispatch();
    const [serverResponse, setServerResponse] = useState(null)
    const todayFeeds = useSelector(state => state.views.today)

    useEffect(() => {
        const response = (async () => await dispatch(runAddToday()))()
        setServerResponse(response)
    }, [dispatch]);

    if (serverResponse && Object.keys(serverResponse).includes('error')) {
        const { error } = serverResponse
        return <ServerError error={ error } />
    }

    return todayFeeds && (
        <div className="homepage-container">
            <div className="homepage__heading">
                <span id="homepage__today">Today</span>
                <span id="homepage__sub-heading">The insights you need to keep ahead</span>
            </div>
            {todayFeeds.length ? (
            <div className='homepage__feeds'>
                {todayFeeds.map((feed, i) => (
                    <div key={i}>
                        <div className='article-list__title'>{feed.feed_name}</div>
                        {feed.entries.map((entry, j) => (
                            <ArticleCard key={j} entry={entry} modalId={`${feed.id}/${j}/${entry.id}`} />
                        ))}
                    </div>
                ))}
            </div>
            ) : (
                <Loading />
            )}
        </div>
    )
}

export default AllView
