import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import parseFromHTML from 'html-react-parser'

import * as sourceActions from '../../store/sources'


const Article = () => {
  const dispatch = useDispatch()

  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState({})

  const getRss = async () => {
    const id = 2
    const dispatched = dispatch(sourceActions.add(id))
    const response = await fetch(`/api/sources/${id}`)
    if (response.ok) {
      const data = await response.json();
      console.log('   :::FETCH_DATA:::   ', data);
      return data
    }
  }

  useEffect(() => {
    (async () => {
      setData(await getRss())
      setLoaded(true)
    })()
  }, [])

  if (!loaded) {
      return null;
  }

  return (
    <div className='article'>
      <h1 className='article__title'>{data.entries[0].title}</h1>
      <h1 className='article__subtitle'>{data.entries[0].subtitle}</h1>
      <h4 className='article__author'>{data.entries[0].author}</h4>
      <div className='article__content'>
        {parseFromHTML(data.entries[0].content ? data.entries[0].content[0].value : data.entries[0].summary)}
      </div>
    </div>
  )
}

export default Article
