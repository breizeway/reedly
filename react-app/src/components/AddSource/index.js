import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as sourceActions from '../../store/sources';

import AddSourceCard from './AddSourceCard'
import './AddSource.css';

const AddSource = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { feedId } = useParams()
    console.log('   :::USEPARAMS():::   ', useParams());
    console.log('   :::FEEDID:::   ', feedId);
    const cardTitles = [
        'Advertising',
        'Automotive',
        'Biopharma',
        'Cybersecurity',
        'Energy',
        'Financial Services',
        'Food',
        'Healthcare',
        'Industrials',
        'Media & Entertainment',
        'Medical Devices',
        'Real Estate',
        'Retail',
        'Telecom',
        'Travel & Hostpitality',
    ]

    const feeds  = Object.values(useSelector(state => state.feeds))

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
                    <div className="add-source__featured-item">item 1</div>
                    <div className="add-source__featured-item">item 2</div>
                    <div className="add-source__featured-item">item 3</div>
                    <div className="add-source__featured-item">item 4</div>
                    <div className="add-source__group-container-heading">Industries</div>
                    {cardTitles.map((title, i) => (
                        <AddSourceCard
                            title={title}
                            key={i}
                        />
                    ))}
                </div>
            </div>
    )
}

export default AddSource
