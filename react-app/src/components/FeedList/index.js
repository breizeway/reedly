import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import ModalWrapper from '../ModalWrapper'
import ArticleModalLink from '../ArticleModal/Link'
import ArticleModalContent from '../ArticleModal/Content'
import DropDownBtn from "./DropDownBtn"
import ArticleCard from "../ArticleCard"
import Loading from "../Loading"
import * as sourceActions from '../../store/sources'
import './FeedList.css';

const FeedList = () => {
    let sourcesInfoArr;
    let sourcesInfo;
    let sources;
    const dispatch = useDispatch()
    let { feedId } = useParams();
    const feed = useSelector(state => state.feeds[Number(feedId)]);
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
        return <Loading />;
    }


    return sources && (
        <div className="feed-holder-container">
            <div className='feed-list__header'>
                <span className="feed-title">{feed?.feed_name}</span>
                <div className="actions-container">
                    < DropDownBtn />
                </div>
            </div>
            <div className="feed-content">
                {sourcesInfo && sourcesInfoArr.map((sourceInfo, idx) => (
                    <div className="source__header" key={idx}>
                        <div
                            className='article-list__title'
                            onClick={() => window.open(sourceInfo?.link)}
                        >
                            {sourceInfo?.title}
                        </div>
                        {sources[idx].map((entry, i) => (
                            <ArticleCard key={i} entry={entry} modalId={`${feed.id}/${i}/${entry.id}`} />
                        ))}
                    </div>
                ))}
            </div>
        </div >
    )
};

export default FeedList;
