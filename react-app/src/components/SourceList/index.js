import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import './SourceList.css';
import * as sourceActions from '../../store/sources'
import ModalWrapper from '../ModalWrapper'
import ArticleModalLink from '../ArticleModal/Link'
import ArticleModalContent from '../ArticleModal/Content'
import Loading from "../Loading"
import DropDownBtn from "./DropDownBtn"

const SourceList = () => {
    const dispatch = useDispatch()
    const sourceId = useParams().id
    const sources = useSelector(state => state.sources)
    const feeds = useSelector(state => state.feeds);
    const [loaded, setLoaded] = useState(false)
    const feed = rightFeed(feeds);


    function rightFeed(feeds) {
        if (feeds === {}) {
            return
        }

        const feedsArr = Object.values(feeds);

        for (let i = 0; i < feedsArr.length; i++) {
            const feed = feedsArr[i]
            const sources = feed?.sources

            for (let i = 0; i < sources.length; i++) {
                let source = sources[i]

                if (source.id === Number(sourceId)) {
                    return feed;
                }
            }
        }
    }



    useEffect(() => {
        (async () => {
            await dispatch(sourceActions.add(sourceId))
            setLoaded(true)
        })()
    }, [dispatch, sourceId])

    if (!loaded) {
        return <Loading />;
    }

    return sources && (
        <div className='source-list-container'>
            <div className='source-list__header'>
                <div
                    className='source-list__title'
                    onClick={() => window.open(sources[sourceId]?.feed.link)}
                >
                    {sources[sourceId]?.feed.title}
                </div>
                <div className="actions-container">
                    < DropDownBtn feed={feed}/>
                </div>
            </div>
            <div className="source-list__subtitle">
                Most Recent
            </div>
            <div className='article-list__article-cards'>
                {sources[sourceId]?.entries.map(entry => (
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
        </div>
    )
};

export default SourceList;
