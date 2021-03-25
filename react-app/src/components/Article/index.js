import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parseFromHTML from 'html-react-parser'

import * as sourceActions from '../../store/sources'


const Article = () => {
  const id = 2 // this will be passed in via the route or redux state

  const dispatch = useDispatch()
  const sources = useSelector(state => state.sources)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      await dispatch(sourceActions.add(id))
      setLoaded(true)
    })()
  }, [dispatch])

  if (!loaded) return null

  return (
    <div className='article'>
      <h1 className='article__title'>{sources[id].entries[0].title}</h1>
      <h1 className='article__subtitle'>{sources[id].entries[0].subtitle}</h1>
      <h4 className='article__author'>{sources[id].entries[0].author}</h4>
      <div className='article__content'>
        {parseFromHTML(
          sources[id].entries[0].content ?
          sources[id].entries[0].content[0].value :
          sources[id].entries[0].summary
        )}
      </div>
    </div>
  )
}

export default Article
