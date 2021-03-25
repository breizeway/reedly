import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import './ArticleList.css';
import * as sourceActions from '../../store/sources'
import ArticleCard from './ArticleCard'

const ArticleList = () => {
  const dispatch = useDispatch()
  const source_id = useParams().id
  const sources = useSelector(state => state.sources)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      await dispatch(sourceActions.add(source_id))
      setLoaded(true)
    })()
  }, [dispatch, source_id])

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
          onClick={() => window.open(sources[source_id]?.feed.link)}
        >
          {sources[source_id]?.feed.title}
        </div>
        <div>
          {sources[source_id]?.feed.subtitle}
        </div>
        <div className='article-list__article-cards'>
          {sources[source_id]?.entries.map(entry => (
            <ArticleCard entry={entry} key={entry.id}/>
          ))}
        </div>
      </div>
    </div>
  )
};

export default ArticleList;
