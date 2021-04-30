import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { rightFeed } from "../../services/utils"

import './SourceList.css';
import * as sourceActions from '../../store/sources'
import Loading from "../Loading"
import DropDownBtn from "./DropDownBtn"
import ArticleCard from "../ArticleCard"
import ServerError from '../ServerError'

const SourceList = () => {
    const dispatch = useDispatch()
    const sourceId = useParams().id
    const sources = useSelector(state => state.sources)
    const feeds = useSelector(state => state.feeds);
    const [loaded, setLoaded] = useState(false)
    const [serverResponse, setServerResponse] = useState(null)
    const feed = rightFeed(feeds, sourceId);



    useEffect(() => {
        (async () => {
            const response = await dispatch(sourceActions.add(sourceId))
            setLoaded(true)
            setServerResponse(response)
        })()
    }, [dispatch, sourceId])

    if (serverResponse && Object.keys(serverResponse).includes('error')) {
        const { error } = serverResponse
        return <ServerError error={ error } />
    }

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
                {sources[sourceId]?.entries.map((entry, i) => (
                    <ArticleCard key={i} entry={entry} modalId={`${sourceId}/${i}/${entry.id}`} />
                ))}
            </div>
        </div>
    )
};

export default SourceList;
