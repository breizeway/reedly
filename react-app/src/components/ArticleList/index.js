import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import './ArticleList.css';
import * as sourceActions from '../../store/sources'
import ArticleCard from './ArticleCard'

const ArticleList = () => {
  const dispatch = useDispatch()
  const sourceId = useParams().id
  const sources = useSelector(state => state.sources)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      await dispatch(sourceActions.add(sourceId))
      setLoaded(true)
    })()
  }, [dispatch, sourceId])

  if (!loaded) {
    return null;
  }

  return sources && (
    <div className='article-list'>
        <Link to='/sources/1'>Source 1</Link> |&nbsp;
        <Link to='/sources/2'>Source 2</Link> |&nbsp;
        <Link to='/sources/3'>Source 3</Link> |&nbsp;
        <Link to='/sources/4'>Source 4</Link>
      <div className='article-list__header'>
        <div
          className='article-list__title'
          onClick={() => window.open(sources[sourceId]?.feed.link)}
        >
          {sources[sourceId]?.feed.title}
        </div>
        <div>
          {sources[sourceId]?.feed.subtitle}
        </div>
      </div>
      <div className='article-list__article-cards'>
        {sources[sourceId]?.entries.map(entry => (
          <ArticleCard
            entry={entry}
            key={entry.id}
            sourceId={sourceId}
          />
        ))}
      </div>
    </div>
  )
};

export default ArticleList;