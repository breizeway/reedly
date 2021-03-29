import React from 'react';
import { Link } from 'react-router-dom'
import parseFromHTML from 'html-react-parser'

import '../FeedList.css';

function FeedArticleList({ sources }) {

    return (
        <>
            {sources.map((source) => {
                return (
                    <Link
                        to={`google.com`}
                        className='article-card'
                    >
                        <div className='article-card__left'>
                            <div
                                className='article-card__image'
                                style={{ backgroundImage: `url(${source.media_content[0]?.url})` }}
                            />
                        </div>
                        <div className='article-card__right'>
                            <div className='article-card__title'>
                                {source.title}
                            </div>
                            <div className='article-card__summary'>
                                {parseFromHTML(source.summary)}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}

export default FeedArticleList
