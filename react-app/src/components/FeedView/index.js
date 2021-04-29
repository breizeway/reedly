import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { runAddToday, runAddAll } from '../../store/views';
import './FeedView.css';
import ArticleCard from '../ArticleCard'
import Loading from '../Loading'
import ServerError from '../ServerError'

function FeedView({ viewName }) {
    const dispatch = useDispatch();

    const [serverResponse, setServerResponse] = useState(null)
    const viewFeeds = useSelector(state => state.views[viewName])

    useEffect(() => {
        let response
        switch (viewName) {
            case 'today':
                response = (async () => await dispatch(runAddToday()))()
                break;
            case 'all':
                response = (async () => await dispatch(runAddAll()))()
                break;
            default:
                break;
        }
        setServerResponse(response)
    }, [dispatch, viewName]);

    if (serverResponse && Object.keys(serverResponse).includes('error')) {
        const { error } = serverResponse
        return <ServerError error={ error } />
    }

    return viewFeeds && (
        <div className="feed-view">
            <div className="feed-view__heading">
                <span id="feed-view__name">
                    {viewName[0].toUpperCase() + viewName.slice(1, viewName.length)}
                </span>
                {viewName === 'today' ? (
                    <span id="feed-view__sub-heading">The insights you need to keep ahead</span>
                ) : (
                    <span id="feed-view__sub-heading"></span>
                )}
            </div>
            {viewFeeds.length ? (
            <div className='feed-view__feeds'>
                {viewFeeds.map((feed, i) => (
                    <div key={i}>
                        <div className='article-list__title'>{feed.feed_name}</div>
                        {feed.entries.map((entry, j) => (
                            <ArticleCard key={j} entry={entry} modalId={`${viewName}/${feed.id}/${j}/${entry.id}`} />
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

export default FeedView
