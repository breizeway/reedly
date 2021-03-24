import React, { useState, useEffect } from 'react'
import parseFromHTML from 'html-react-parser'


const RssTest = () => {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState({})

  const getRss = async () => {
    const id = 1
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
    <div>
      <h1 className='article__title'>{data.entries[0].title}</h1>
      <h1 className='article__subtitle'>{data.entries[0].subtitle}</h1>
      <h4 className='article__author'>{data.entries[0].author}</h4>
      {parseFromHTML(data.entries[0].content)}
    </div>
  )
}

export default RssTest
