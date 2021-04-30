import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { runAddToday, runAddAll } from '../../store/views';
import { setActive } from '../../store/modal';
import './FeedView.css';
import ArticleCard from '../ArticleCard'
import Loading from '../Loading'

function FeedView({ viewName }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [serverResponse, setServerResponse] = useState(null)
    const viewFeeds = useSelector(state => state.views[viewName])

    useEffect(() => {
        let response
        (async () => {
            switch (viewName) {
                case 'today':
                    response = await dispatch(runAddToday())
                    break;
                case 'all':
                    response = await dispatch(runAddAll())
                    break;
                default:
                    break;
            }
            setServerResponse(response)
        })()
    }, [dispatch, viewName]);

    if (serverResponse && Object.keys(serverResponse).includes('error')) {
        return (
            <div className='feed-view__welcome'>
                <h1 className='feed-view__welcome-header'>Welcome to Reedly</h1>
                <div className='feed-view__welcome-content'>
                    <div>
                        Create a new feed to get started.
                    </div>
                    <div
                        className='feed-list__add-source-link standard-button'
                        onClick={() => dispatch(setActive('sidebar/addFeed'))}
                    >
                    <i className='fas fa-plus' />&nbsp;Create New Feed
                    </div>
                </div>
            </div>
        )
    }

    const ViewFeedContent = () => {
        if (viewFeeds.length) {
            return (
                <div className='feed-view__feeds'>
                    {viewFeeds.map((feed, i) => (
                        <div key={i}>
                            <div
                                className='article-list__title'
                                onClick={() => history.push(`/feeds/${feed.id}`)}
                            >
                                {feed.feed_name}
                            </div>
                            {feed.entries.map((entry, j) => (
                                <ArticleCard key={j} entry={entry} modalId={`${viewName}/${feed.id}/${j}/${entry.id}`} />
                            ))}
                        </div>
                    ))}
                </div>
            )
        }
        else if (serverResponse === 'no sources') {
            return (
                <div className='feed-list__add-source'>
                    <div
                        className='feed-list__add-source-link standard-button'
                        onClick={() => history.push(`/sources/add/`)}
                    >
                        <i className='fas fa-plus' />&nbsp;Add Source
                    </div>
                </div>
            )
        }
        else {
            return <Loading />
        }
    }

    return (
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
            <ViewFeedContent />
        </div>
    )
}

export default FeedView
