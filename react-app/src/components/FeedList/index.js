import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import ModalWrapper from '../ModalWrapper'
import ArticleModalLink from '../ArticleModal/Link'
import ArticleModalContent from '../ArticleModal/Content'
import * as sourceActions from '../../store/sources'
import './FeedList.css';

const FeedList = () => {
    let sourcesInfoArr;
    let sourcesInfo;
    let sources;
    const dispatch = useDispatch()
    let { feedId } = useParams();
    const feed = useSelector(state => state.feeds[Number(feedId)]);
    console.log('   :::FEED:::   ', feed);
    sources = useSelector(state => state.sources)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        (async () => {
            await dispatch(sourceActions.getSources(feedId))
            setLoaded(true)
        })()
    }, [dispatch, feedId])


    if (sources?.sourcesInfo) {
        sourcesInfo = sources.sourcesInfo
        sourcesInfoArr = Object.values(sourcesInfo)
        sources = sources.sources
    }

    if (!loaded) {
        return null;
    }


    return sources && (
        <div className='article-list__header'>
            <div className="feed-title">{feed.feed_name}</div>
            {sourcesInfo && sourcesInfoArr.map((sourceInfo, idx) => (
                <div className="source__header" key={idx}>
                    <div
                        className='article-list__title'
                        onClick={() => window.open(sourceInfo?.link)}
                    >
                        {sourceInfo?.title}
                    </div>
                    <div>{sourceInfo?.subtitle}</div>
                    {sources[idx].map(entry => (
                        <ModalWrapper
                            key={entry.id}
                            modalLink={
                                <ArticleModalLink
                                    entry={entry}
                                />
                            }
                            modalContent={
                                <ArticleModalContent
                                    entry={entry}
                                />
                            }
                        />
                    ))}
                </div>
            ))}
        </div >
    )
};

export default FeedList;
