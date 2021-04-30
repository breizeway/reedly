import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as sourceActions from '../../store/sources';
import { getAllFollows } from "../../store/follows"

import AddSourceCard from './AddSourceCard'
import './AddSource.css';

const AddSource = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { feedId } = useParams()
    const sources = (useSelector(state => state.sources));
    const follows = useSelector(state => state.follows);
    const sourcesArr = Object.values(sources);
    const followsArr = Object.values(follows);



    useEffect(() => {
        async function getFollows() {
            await dispatch(getAllFollows());
        }
        getFollows();
    }, [dispatch])


    useEffect(() => {
        async function getSources() {
            await dispatch(sourceActions.getAllSources());
        }
        getSources();
    }, [dispatch])

    const feeds = Object.values(useSelector(state => state.feeds))

    const [sourceUrl, setSourceUrl] = useState('')
    const [feed, setFeed] = useState(feedId ? feedId : 'default')

    const submit = async e => {
        e.preventDefault()
        if (feed !== 'default') {
            const source = await dispatch(sourceActions.addNew(sourceUrl, feed))
            history.push(`/sources/${source.id}`)
        }
    }

    return (
        <div className="add-source-container">
            <div className="add-source">
                <div className='add-source__add'>
                    <div className='add-source__text'>Add new source...</div>
                    <form className='add-source__form' onSubmit={submit}>
                        <div className='add-source__input-container'>
                            <div className='add-source__add-icon'>
                                <i className='' />
                            </div>
                            <input
                                type='text'
                                value={sourceUrl}
                                onChange={e => setSourceUrl(e.target.value)}
                                placeholder='RSS Feed URL'
                            ></input>
                            <select
                                value={feed}
                                onChange={e => setFeed(e.target.value)}
                                placeholder='feed'
                            >
                                <option value='default' className='add-source__default-option'>-- choose feed --&nbsp;</option>
                                {feeds.map(feed => (
                                    <option value={feed.id}>{feed.feed_name}</option>
                                ))}
                            </select>
                            <button>Add</button>
                        </div>
                    </form>
                </div>
                <div className="add-source__grid-container">
                    <div className="add-source__group-container-heading">Suggested Sources</div>
                    {sourcesArr.map((source, i) => (
                        <AddSourceCard
                            key={i}
                            source={source}
                            name={source.alt_name}
                            img={source.source_img}
                            followsArr={followsArr}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddSource
