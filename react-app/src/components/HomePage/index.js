import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeeds } from '../../store/all';

import ModalWrapper from '../ModalWrapper'
import ArticleModalLink from '../ArticleModal/Link'
import ArticleModalContent from '../ArticleModal/Content'
import './HomePage.css';

function HomePage() {
    let sourcesInfo;
    let sourcesInfoArr;
    const dispatch = useDispatch();
    // const feeds = useSelector(state => state.feeds);
    let sources = useSelector(state => state.all)


    useEffect(() => {
        async function fetchData() {
            await dispatch(getAllFeeds());
        }
        fetchData();
    }, [dispatch]);

    // const feedsArr = Object.values(feeds);

    if (sources?.sourcesInfo) {
        sourcesInfo = sources.sourcesInfo
        sourcesInfoArr = Object.values(sourcesInfo)
        sources = sources.sources
    }

    return sources && (
        <div className='article-list__header'>
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
}

export default HomePage
